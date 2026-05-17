import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: '127.0.0.1', // Usando o IP que está no seu HeidiSQL
  user: 'root',
  password: '', // Senha vazia conforme sua imagem
  database: 'safehash_db', // Nome do banco que você criou no script SQL
  port: 3306
  
});

export default connection;
