import pool from './config/database';

async function testConnection() {
  console.log('🔄 Probando conexión a PostgreSQL...');
  console.log(`📍 Host: ${process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] || 'unknown'}`);
  
  try {
    // Intentar conectar
    const client = await pool.connect();
    console.log('✅ Conexión exitosa!');
    
    // Verificar si el esquema existe
    const schemaResult = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'curetcore'
    `);
    
    if (schemaResult.rows.length > 0) {
      console.log('✅ Esquema curetcore encontrado');
      
      // Verificar tabla users
      const tableResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'curetcore' 
        AND table_name = 'users'
      `);
      
      if (tableResult.rows.length > 0) {
        console.log('✅ Tabla users encontrada');
        
        // Contar usuarios
        const countResult = await client.query('SELECT COUNT(*) FROM curetcore.users');
        console.log(`👥 Usuarios en la base de datos: ${countResult.rows[0].count}`);
      } else {
        console.log('❌ Tabla users NO encontrada');
        console.log('💡 Ejecute el script init-database.sql para crear las tablas');
      }
    } else {
      console.log('❌ Esquema curetcore NO encontrado');
      console.log('💡 Ejecute el script init-database.sql para crear el esquema');
    }
    
    client.release();
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    console.log('\n💡 Posibles soluciones:');
    console.log('1. Verifique que el servidor PostgreSQL esté accesible');
    console.log('2. Verifique las credenciales en el archivo .env');
    console.log('3. Si está usando una IP externa, verifique que tenga acceso desde su red');
    console.log('4. Considere usar un túnel SSH o VPN si es necesario');
  } finally {
    await pool.end();
  }
}

testConnection();