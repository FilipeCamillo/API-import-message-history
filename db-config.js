require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
};

module.exports = dbConfig;
