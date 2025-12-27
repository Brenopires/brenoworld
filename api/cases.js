import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkAuth(req) {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return null;
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
            const result = await client.query('SELECT * FROM cases ORDER BY created_at DESC');
            return response.json({ results: result.rows });
        }

        if (request.method === 'POST') {
            if (!await checkAuth(request)) return response.status(401).json({ error: 'Unauthorized' });

            const { title, summary, result, lessons } = request.body;
            // lessons is array
            await client.query(
                'INSERT INTO cases (title, summary, result, lessons) VALUES ($1, $2, $3, $4)',
                [title, summary, result, JSON.stringify(lessons)]
            );
            return response.status(201).json({ success: true });
        }

        if (request.method === 'DELETE') {
            if (!await checkAuth(request)) return response.status(401).json({ error: 'Unauthorized' });
            const { id } = request.query;
            await client.query('DELETE FROM cases WHERE id = $1', [id]);
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
