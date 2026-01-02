#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🚀 Starting Brenoworld Supabase Migration...\n');

// Read the SQL migration file
const sqlFile = join(__dirname, 'supabase-quick-migration.sql');
const sql = readFileSync(sqlFile, 'utf-8');

// Split by semicolons and filter out comments and empty lines
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s && !s.startsWith('--'));

console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

let successCount = 0;
let errorCount = 0;

for (let i = 0; i < statements.length; i++) {
  const statement = statements[i];

  // Skip empty or comment-only statements
  if (!statement || statement.startsWith('--')) continue;

  // Get a preview of the statement for logging
  const preview = statement.substring(0, 60).replace(/\n/g, ' ') + '...';

  try {
    console.log(`[${i + 1}/${statements.length}] Executing: ${preview}`);

    const { error } = await supabase.rpc('exec_sql', { sql_string: statement + ';' });

    if (error) {
      // Try direct execution as fallback
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({ sql_string: statement + ';' })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
    }

    console.log(`   ✅ Success\n`);
    successCount++;
  } catch (err) {
    console.log(`   ⚠️  Warning: ${err.message}\n`);
    errorCount++;
  }
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Successfully executed: ${successCount} statements`);
console.log(`⚠️  Warnings/Errors: ${errorCount} statements`);
console.log('='.repeat(50) + '\n');

// Verify tables were created
console.log('🔍 Verifying tables...\n');

const tables = ['posts', 'media_items', 'tools', 'playbooks', 'cases', 'trips'];
let verifiedCount = 0;

for (const table of tables) {
  try {
    const { data, error } = await supabase.from(table).select('*').limit(1);

    if (error) {
      console.log(`   ❌ Table '${table}' - NOT FOUND`);
    } else {
      console.log(`   ✅ Table '${table}' - OK`);
      verifiedCount++;
    }
  } catch (err) {
    console.log(`   ❌ Table '${table}' - ERROR: ${err.message}`);
  }
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Verified ${verifiedCount}/${tables.length} tables`);
console.log('='.repeat(50) + '\n');

if (verifiedCount === tables.length) {
  console.log('🎉 Migration completed successfully!\n');
  console.log('Next steps:');
  console.log('1. Create admin user at: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/users');
  console.log('2. Email: breno@familiapires.com.br');
  console.log('3. Run: npm run dev to test locally\n');
} else {
  console.log('⚠️  Some tables could not be verified. Please check manually.\n');
  console.log('Manual migration: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/sql/new\n');
}
