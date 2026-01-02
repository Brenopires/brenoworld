import { checkAdmin, getSupabaseAdmin } from '../lib/supabase-server.js';
import { postSchema } from './schemas.js';

const supabase = getSupabaseAdmin();

export default async function handler(request, response) {
    try {
        console.log('[API Posts] Request method:', request.method);

        if (request.method === 'GET') {
            console.log('[API Posts] Executing GET query...');
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('[API Posts] GET error:', error);
                throw error;
            }
            console.log('[API Posts] GET success, returning', data?.length || 0, 'posts');
            return response.json({ results: data });
        }

        if (request.method === 'POST') {
            console.log('[API Posts] POST request body:', request.body);
            console.log('[API Posts] Authorization header:', request.headers.authorization ? 'EXISTS' : 'MISSING');

            try {
                await checkAdmin(request);
                console.log('[API Posts] Admin check passed');
            } catch (err) {
                console.error('[API Posts] Admin check failed:', err.message);
                return response.status(err.statusCode || 401).json({ error: err.message });
            }

            // Validate input
            try {
                const validated = postSchema.parse(request.body);
                console.log('[API Posts] Validation passed:', validated);

                const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                console.log('[API Posts] Inserting into database...');
                const { data, error } = await supabase
                    .from('posts')
                    .insert([{
                        type: validated.type,
                        title: validated.title,
                        summary: validated.summary,
                        content: validated.content,
                        date: date
                    }])
                    .select()
                    .single();

                if (error) {
                    console.error('[API Posts] Insert error:', error);
                    throw error;
                }

                console.log('[API Posts] Insert success! Post ID:', data.id);
                return response.status(201).json(data);
            } catch (validationError) {
                if (validationError.errors) {
                    return response.status(400).json({
                        error: 'Validation failed',
                        details: validationError.errors
                    });
                }
                throw validationError;
            }
        }

        if (request.method === 'DELETE') {
            try {
                await checkAdmin(request);
            } catch (err) {
                return response.status(err.statusCode || 401).json({ error: err.message });
            }

            const { id } = request.query;
            if (!id) {
                return response.status(400).json({ error: 'ID is required' });
            }

            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return response.json({ success: true });
        }

        return response.status(405).json({ error: 'Method not allowed' });

    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
