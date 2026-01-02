import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

console.log('👤 Creating admin user...\n');

const adminEmail = 'breno@familiapires.com.br';
const adminPassword = 'brenoworld2026'; // Você pode mudar depois no dashboard

async function createAdminUser() {
  try {
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === adminEmail);

    if (userExists) {
      console.log('✅ Admin user already exists!');
      console.log(`📧 Email: ${adminEmail}\n`);
      console.log('You can reset the password at:');
      console.log('→ https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/users\n');
      return;
    }

    // Create admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: 'Breno Pires',
        role: 'admin'
      }
    });

    if (error) {
      throw error;
    }

    console.log('✅ Admin user created successfully!\n');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('\n⚠️  IMPORTANT: Change your password after first login!\n');
    console.log('Next step: Test the application');
    console.log('→ npm run dev\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    console.log('\n📝 Please create manually at:');
    console.log('→ https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/users');
    console.log('\nUse these credentials:');
    console.log('Email:', adminEmail);
    console.log('Password: (choose a secure password)');
    console.log('Auto Confirm: ✅ Check this box\n');
  }
}

createAdminUser();
