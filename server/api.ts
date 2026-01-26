import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Plugin, ViteDevServer } from 'vite';

let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return supabaseAdmin;
}

export function apiPlugin(): Plugin {
  return {
    name: 'api-server',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/decision-log', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body);

            const { decision, alternatives, expected_outcome, actual_outcome, lessons_learned, tags } = data;

            if (!decision) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Decision is required' }));
              return;
            }

            const { data: result, error } = await getSupabaseClient()
              .from('decision_logs')
              .insert({
                decision,
                alternatives,
                expected_outcome,
                actual_outcome,
                lessons_learned,
                tags,
                created_at: new Date().toISOString(),
              })
              .select()
              .single();

            if (error) {
              console.error('Supabase error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: error.message }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, data: result }));
          } catch (err) {
            console.error('API error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        });
      });
    },
  };
}
