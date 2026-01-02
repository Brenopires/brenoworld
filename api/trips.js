import { checkAdmin, getSupabaseAdmin } from '../lib/supabase-server.js';
import { tripSchema } from './schemas.js';

const supabase = getSupabaseAdmin();

export default async function handler(request, response) {
    try {
        if (request.method === 'GET') {
            const { data, error } = await supabase
                .from('trips')
                .select('*')
                .order('year', { ascending: false })
                .order('month', { ascending: false });

            if (error) throw error;
            return response.json({ results: data });
        }

        if (request.method === 'POST') {
            try {
                await checkAdmin(request);
            } catch (err) {
                return response.status(err.statusCode || 401).json({ error: err.message });
            }

            // Validate input
            try {
                const validated = tripSchema.parse(request.body);

                const { error } = await supabase
                    .from('trips')
                    .insert([{
                        country: validated.country,
                        display_name: validated.display_name,
                        month: validated.month,
                        year: validated.year,
                        description: validated.description
                    }]);

                if (error) throw error;
                return response.status(201).json({ success: true });
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
                .from('trips')
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
