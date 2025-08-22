const bcrypt = require('bcryptjs');

const password = 'CuretAdmin2024!';
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nSQL to insert admin user:');
    console.log(`
INSERT INTO curetcore.users (email, password_hash, first_name, last_name, role)
VALUES (
    'admin@curetcore.com',
    '${hash}',
    'Admin',
    'CuretCore',
    'super_admin'
) ON CONFLICT (email) DO NOTHING;
    `);
}).catch(err => {
    console.error('Error generating hash:', err);
});