import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🚀 Testing Supabase connection and tables...\n');

const tables = ['posts', 'media_items', 'tools', 'playbooks', 'cases', 'trips'];

async function checkTables() {
  let existingTables = 0;

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('id').limit(1);

      if (error) {
        console.log(`❌ Table '${table}' does not exist yet`);
      } else {
        console.log(`✅ Table '${table}' exists`);
        existingTables++;
      }
    } catch (err) {
      console.log(`❌ Table '${table}' check failed: ${err.message}`);
    }
  }

  console.log(`\n📊 Found ${existingTables}/${tables.length} tables\n`);

  if (existingTables === 0) {
    console.log('⚠️  No tables found. Please run the SQL migration manually:\n');
    console.log('1. Go to: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/sql/new');
    console.log('2. Copy the content from: supabase-quick-migration.sql');
    console.log('3. Paste and click "Run"\n');
  } else if (existingTables === tables.length) {
    console.log('🎉 All tables exist! Database is ready.\n');
    console.log('Next step: Create admin user');
    console.log('→ https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/users\n');
  } else {
    console.log('⚠️  Some tables are missing. Please complete the migration.\n');
  }
}

checkTables();
