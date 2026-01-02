import { checkAdmin, getSupabaseAdmin } from '../lib/supabase-server.js';
import { postSchema } from './schemas.js';

export default async function handler(request, response) {
    try {
        // Initialize Supabase client
        const supabase = getSupabaseAdmin();

        if (!supabase) {
            console.error('Supabase client not initialized');
            return response.status(500).json({ error: 'Database connection failed' });
        }

        if (request.method === 'GET') {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('GET error:', error.message);
                return response.status(500).json({ error: error.message });
            }
            console.log('GET success, posts count:', data?.length || 0);
            return response.json({ results: data });
        }

        if (request.method === 'POST') {
            try {
                await checkAdmin(request);
            } catch (err) {
                console.error('Admin check failed:', err.message);
                return response.status(err.statusCode || 401).json({ error: err.message });
            }

            // Validate input
            try {
                const validated = postSchema.parse(request.body);
                const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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
                    console.error('Insert error:', error.message, error.code);
                    return response.status(500).json({ error: error.message });
                }

                console.log('Insert success! Post ID:', data?.id);
                return response.status(201).json(data);
            } catch (validationError) {
                console.error('Validation error:', validationError.message);
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
        console.error('Fatal error:', err.message, err.stack);
        return response.status(500).json({
            error: "Internal Server Error",
            message: err.message,
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
}
