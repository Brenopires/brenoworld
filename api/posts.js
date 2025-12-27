import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Helper to check session (Naive implementation for MVP)
// In prod, use better-auth server-side SDK
async function checkAuth(req) {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return null;

    // Parse better-auth.session_token
    const match = cookieHeader.match(/better-auth.session_token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) return null;

    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM neon_auth.session WHERE token = $1 AND "expiresAt" > NOW()', [token]);
        return res.rows[0];
    } catch (e) {
        console.error(e);
        return null;
    } finally {
        client.release();
    }
}

export default async function handler(request, response) {
    const client = await pool.connect();

    try {
        if (request.method === 'GET') {
            const result = await client.query('SELECT * FROM posts ORDER BY created_at DESC');
            return response.json({ results: result.rows });
        }

        if (request.method === 'POST') {
            const session = await checkAuth(request);
            if (!session) return response.status(401).json({ error: 'Unauthorized' });

            const { type, title, summary, content } = request.body;
            const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            await client.query(
                'INSERT INTO posts (type, title, summary, content, date) VALUES ($1, $2, $3, $4, $5)',
                [type, title, summary, content, date]
            );
            return response.status(201).json({ success: true });
        }

        if (request.method === 'DELETE') {
            const session = await checkAuth(request);
            if (!session) return response.status(401).json({ error: 'Unauthorized' });

            const { id } = request.query; // or body
            await client.query('DELETE FROM posts WHERE id = $1', [id]);
            return response.json({ success: true });
        }

        return response.status(405).json({ error: 'Method not allowed' });

    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release();
    }
}
