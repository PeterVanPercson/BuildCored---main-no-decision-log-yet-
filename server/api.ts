import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Plugin, ViteDevServer } from 'vite';
import crypto from 'crypto';

const adjectives = ['Latency', 'Resilient', 'Async', 'Distributed', 'Cached', 'Indexed', 'Parallel', 'Atomic', 'Eventual', 'Consistent', 'Sharded', 'Replicated', 'Fault', 'Load', 'Queue', 'Stream', 'Batch', 'Pipeline', 'Circuit', 'Retry'];
const animals = ['Llama', 'Falcon', 'Otter', 'Badger', 'Raven', 'Panda', 'Wolf', 'Hawk', 'Fox', 'Bear', 'Lynx', 'Crane', 'Viper', 'Shark', 'Eagle', 'Cobra', 'Tiger', 'Bison', 'Moose', 'Whale'];

function generateHandle(email: string): string {
  const normalized = email.trim().toLowerCase();
  const hash = crypto.createHash('sha256').update(normalized).digest();
  const adj = adjectives[hash[0] % adjectives.length];
  const animal = animals[hash[1] % animals.length];
  const num = ((hash[2] << 8) | hash[3]) % 10000;
  return `${adj} ${animal} #${num.toString().padStart(4, '0')}`;
}

const PROMPT_TEXT = `You inherit a payment processing system handling $2M/day. For the past week, latency spikes to 3+ seconds during peak hours (2–4pm), causing 2–3% of transactions to timeout.

You have:
• 2 weeks
• One junior engineer (started 3 months ago)
• No budget for new infrastructure
• Access to logs, metrics, and the codebase

The situation:
• CEO wants a fix before a board meeting in 10 days
• CTO wants root cause understood before any fix ships
• The on-call engineer who knew the system best quit last month`;

const LIMITS: Record<string, number> = {
  first_action: 280, why_first: 280, second_action: 280, why_second: 280,
  third_action: 280, signals_data_first: 280, wont_do: 450, biggest_risk: 350,
  verify_and_rollback: 350, with_more_time: 280
};

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
      server.middlewares.use('/api/submit-decision-log', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
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

            const required = ['email', 'first_action', 'why_first', 'second_action', 'why_second',
              'third_action', 'signals_data_first', 'wont_do', 'biggest_risk', 'verify_and_rollback',
              'with_more_time', 'attest_original'];

            for (const field of required) {
              if (!data[field] && data[field] !== false) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: `Missing: ${field}` }));
                return;
              }
            }

            if (!data.attest_original) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Must attest original work' }));
              return;
            }

            for (const [field, max] of Object.entries(LIMITS)) {
              if (data[field] && data[field].length > max) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: `${field} exceeds ${max} chars` }));
                return;
              }
            }

            const handle = generateHandle(data.email);

            const { error } = await getSupabaseClient().from('decision_logs').insert({
              email: data.email,
              handle,
              visibility: data.visibility || 'unlisted',
              role_track: data.role_track || null,
              seniority: data.seniority || null,
              time_budget: data.time_budget || null,
              prompt_id: 'problem-1',
              prompt_text: PROMPT_TEXT,
              first_action: data.first_action,
              why_first: data.why_first,
              second_action: data.second_action,
              why_second: data.why_second,
              third_action: data.third_action,
              signals_data_first: data.signals_data_first,
              wont_do: data.wont_do,
              biggest_risk: data.biggest_risk,
              verify_and_rollback: data.verify_and_rollback,
              with_more_time: data.with_more_time,
              attest_original: data.attest_original,
              status: 'submitted'
            });

            if (error) {
              console.error('Supabase error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Submission failed' }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ handle }));
          } catch (err) {
            console.error('API error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });
    },
  };
}
