import mysql from 'mysql2/promise';
import 'dotenv/config';


const connection = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '', 
  database: process.env.DB_NAME || 'safehash_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


connection.getConnection()
  .then(() => console.log('✅ Conectado ao banco de dados MySQL com sucesso!'))
  .catch((err) => {
    console.error('❌ Erro ao conectar no banco de dados:', err.message);
    console.log('Verifique se o seu MySQL está rodando e se os dados no .env estão corretos.');
  });

export default connection;
