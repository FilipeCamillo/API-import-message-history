// index.js

const express = require('express');
const { Pool } = require('pg');
const dbConfig = require('./db-config'); // Importe as configurações do banco de dados
const { v4: uuidv4 } = require('uuid');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser'); // Importe o body-parser
// app.use(express.json()); // Para analisar solicitações JSON
// app.use(express.urlencoded({ extended: true })); // Para analisar solicitações codificadas por URL

// Use o body-parser para analisar dados JSON no corpo da solicitação
app.use(bodyParser.json());
const path = require('path');


app.use(express.static(path.join(__dirname, './public')));


app.use('/ImportExcelPage', express.static(path.join(__dirname, './src/components/ImportExcelPage')));





// Configuração do pool de conexão do PostgreSQL
const pool = new Pool(dbConfig);


app.get('/getVersion', (req, res) => {
    // Lê o conteúdo do arquivo package.json
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
    // Obtém a versão do package.json
    const version = packageJson.version;
  
    // Envia a versão como resposta JSON
    res.json({ version });
  });
  
app.get('/api/get_company/:companyID/:token', async (req, res) => {
    try {
        const companyID = req.params.companyID; // Obtém o ID da empresa da URL
        const token = req.params.token; // Obtém o token da URL

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        // Se a validação for bem-sucedida, execute uma nova consulta SQL para buscar dados de outra tabela
        const queryData = `SELECT * FROM "Companies" WHERE "id" = $1`;
        const resultData = await pool.query(queryData, [companyID]);

        res.json(resultData.rows);
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
});



app.get('/api/get_TicketTraking/:companyID/:token', async (req, res) => {
    try {
        const companyID = req.params.companyID; // Obtém o ID da empresa da URL
        const token = req.params.token; // Obtém o token da URL
        const page = req.query.page || 1; // Obtém o número da página da consulta (query) da URL
        const perPage = 20; // Define quantos resultados por página você deseja exibir

        // Calcula o deslocamento com base no número da página e na quantidade por página
        const offset = (page - 1) * perPage;

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        // Se a validação for bem-sucedida, execute uma nova consulta SQL com paginação
        const queryData = `SELECT * FROM "TicketTraking" WHERE "companyId" = $1 LIMIT $2 OFFSET $3`;
        const resultData = await pool.query(queryData, [companyID, perPage, offset]);

        res.json(resultData.rows);
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
});



app.get('/api/get_Ticket/:companyID/:token', async (req, res) => {
    try {
        const companyID = req.params.companyID; // Obtém o ID da empresa da URL
        const token = req.params.token; // Obtém o token da URL
        const page = req.query.page || 1; // Obtém o número da página da consulta (query) da URL
        const perPage = 20; // Define quantos resultados por página você deseja exibir

        // Calcula o deslocamento com base no número da página e na quantidade por página
        const offset = (page - 1) * perPage;

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        // Se a validação for bem-sucedida, execute uma nova consulta SQL com paginação
        const queryData = `SELECT * FROM "Tickets" WHERE "companyId" = $1 LIMIT $2 OFFSET $3`;
        const resultData = await pool.query(queryData, [companyID, perPage, offset]);

        res.json(resultData.rows);
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
});



app.get('/api/get_Users/:companyID/:token', async (req, res) => {
    try {
        const companyID = req.params.companyID; // Obtém o ID da empresa da URL
        const token = req.params.token; // Obtém o token da URL
        const page = req.query.page || 1; // Obtém o número da página da consulta (query) da URL
        const perPage = 20; // Define quantos resultados por página você deseja exibir

        // Calcula o deslocamento com base no número da página e na quantidade por página
        const offset = (page - 1) * perPage;

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        // Se a validação for bem-sucedida, execute uma nova consulta SQL com paginação
        const queryData = `SELECT * FROM "Users" WHERE "companyId" = $1 LIMIT $2 OFFSET $3`;
        const resultData = await pool.query(queryData, [companyID, perPage, offset]);

        res.json(resultData.rows);
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
});


app.get('/api/get_Tags_Kanban/:companyID/:token', async (req, res) => {
    try {
        const companyID = req.params.companyID; // Obtém o ID da empresa da URL
        const token = req.params.token; // Obtém o token da URL
        const page = req.query.page || 1; // Obtém o número da página da consulta (query) da URL
        const perPage = 20; // Define quantos resultados por página você deseja exibir

        // Calcula o deslocamento com base no número da página e na quantidade por página
        const offset = (page - 1) * perPage;

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        // Se a validação for bem-sucedida, execute uma nova consulta SQL com paginação
        const queryData = `SELECT * FROM "Tags" WHERE "companyId" = $1 LIMIT $2 OFFSET $3`;
        const resultData = await pool.query(queryData, [companyID, perPage, offset]);

        res.json(resultData.rows);
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
});


app.get('/api/get_UserRatings/:companyID/:token', async (req, res) => {
    try {
        const companyID = req.params.companyID; // Obtém o ID da empresa da URL
        const token = req.params.token; // Obtém o token da URL
        const page = req.query.page || 1; // Obtém o número da página da consulta (query) da URL
        const perPage = 20; // Define quantos resultados por página você deseja exibir

        // Calcula o deslocamento com base no número da página e na quantidade por página
        const offset = (page - 1) * perPage;

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        // Se a validação for bem-sucedida, execute uma nova consulta SQL com paginação
        const queryData = `SELECT * FROM "UserRatings" WHERE "companyId" = $1 LIMIT $2 OFFSET $3`;
        const resultData = await pool.query(queryData, [companyID, perPage, offset]);

        res.json(resultData.rows);
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
});


app.get('/api/get_Contacts/:companyID/:token', async (req, res) => {
    try {
        const companyID = req.params.companyID; // Obtém o ID da empresa da URL
        const token = req.params.token; // Obtém o token da URL
        const page = req.query.page || 1; // Obtém o número da página da consulta (query) da URL
        const perPage = 20; // Define quantos resultados por página você deseja exibir

        // Calcula o deslocamento com base no número da página e na quantidade por página
        const offset = (page - 1) * perPage;

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        // Se a validação for bem-sucedida, execute uma nova consulta SQL com paginação
        const queryData = `SELECT * FROM "Contacts" WHERE "companyId" = $1 LIMIT $2 OFFSET $3`;
        const resultData = await pool.query(queryData, [companyID, perPage, offset]);

        res.json(resultData.rows);
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
    }
});




app.post('/api/insert_message', async (req, res) => {
    try {
        const { companyID, token, contactNumber, createdAt, updatedAt, } = req.body;

        // Execute uma consulta SQL para verificar a validade do token e da empresa
        const queryValidation = `SELECT * FROM "Whatsapps" WHERE "companyId" = $1 AND "token" = $2`;
        const resultValidation = await pool.query(queryValidation, [companyID, token]);

        if (resultValidation.rows.length === 0) {
            return res.status(401).json({ error: 'Token ou empresa inválidos.' });
        }

        let contactId;
        let ticketId;

        // Verifique se o número de contato já está cadastrado na tabela "Contacts"
        const queryCheckContact = `SELECT "id" FROM "Contacts" WHERE "companyId" = $1 AND "number" = $2`;
        const resultCheckContact = await pool.query(queryCheckContact, [companyID, contactNumber]);

        if (resultCheckContact.rows.length === 0) {
            return res.status(400).json({ error: 'Número de contato não cadastrado.' });
        } else {
            // Se o contato já estiver cadastrado, obtenha o ID do contato
            contactId = resultCheckContact.rows[0].id;
        }

        // Verifique se já existe um ticket vinculado a este contato
        const queryCheckTicket = `SELECT "id" FROM "Tickets" WHERE "contactId" = $1`;
        const resultCheckTicket = await pool.query(queryCheckTicket, [contactId]);
        const ticketUuid = uuidv4();
        if (resultCheckTicket.rows.length === 0) {
            // Se não existir um ticket, crie um novo e obtenha o ID dele
            const queryCreateTicket = `INSERT INTO "Tickets" ( "status", "lastMessage", "contactId", "isGroup", "unreadMessages", "companyId", "createdAt", "updatedAt","uuid", "chatbot", "isBot", "channel", "amountUsedBotQueues", "fromMe", "sendInactiveMessage", "amountUsedBotQueuesNPS", "isOutOfHour") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING "id"`;
            const  resultCreateTicket = await pool.query(queryCreateTicket, [
                'close', // Substitua 'status_value' pelo valor desejado
                'backup', // Substitua 'lastMessage_value' pelo valor desejado
                contactId,
                false, // Substitua 'isGroup_value' pelo valor desejado
                '0', // Substitua 'unreadMessages_value' pelo valor desejado
                companyID, // Este valor já está sendo passado na requisição original
                createdAt, // Usando a variável createdAt aqui
                updatedAt, // Usando a variável updatedAt aqui
                ticketUuid, // Use o UUID gerado aqui
                false, // Substitua 'chatbot_value' pelo valor desejado
                false, // Substitua 'isBot_value' pelo valor desejado
                'whatsapp', // Substitua 'channel_value' pelo valor desejado
                '0', // Substitua 'amountUsedBotQueues_value' pelo valor desejado
                false, // Substitua 'fromMe_value' pelo valor desejado
                false, // Substitua 'sendInactiveMessage_value' pelo valor desejado
                '0', // Substitua 'amountUsedBotQueuesNPS_value' pelo valor desejado
                false // Substitua 'isOutOfHour_value' pelo valor desejado
            ]);
            ticketId = resultCreateTicket.rows[0].id;
        } else {
            // Se já existir um ticket, obtenha o ID do ticket existente
            ticketId = resultCheckTicket.rows[0].id;
        }

        // Dados da mensagem a serem inseridos
        const {
            body,
            ack,
            read,
            mediaType,
            mediaUrl,
            fromMe,
            isDeleted,
            companyId,
            isPrivate,
            isEdited
        } = req.body;

        // Execute uma consulta SQL para inserir os dados na tabela "Messages"
        const queryInsertMessage = `
            INSERT INTO "Messages" (
                body, ack, read, "mediaType", "mediaUrl", "ticketId", "createdAt",
                "updatedAt", "fromMe", "isDeleted", "contactId", "companyId", "isPrivate", "isEdited"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        `;

        // Parâmetros para a inserção
        const insertParams = [
            body, ack, read, mediaType, mediaUrl, ticketId, createdAt,
            updatedAt, fromMe, isDeleted, contactId, companyId, isPrivate, isEdited
        ];

        // Execute a inserção dos dados
        await pool.query(queryInsertMessage, insertParams);

        res.json({ message: 'Mensagem inserida com sucesso!' });
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);

        // Verifique se o erro é uma exceção retornada pelo banco de dados
        if (error.code === 'E' && error.detail) {
            // Se for um erro específico do banco de dados, você pode apresentar a mensagem de erro do banco de dados
            res.status(500).json({ error: error.detail });
        } else {
            // Caso contrário, apresente uma mensagem de erro genérica
            res.status(500).json({ error: 'Erro ao inserir mensagem no banco de dados.' });
        }
    }
});









const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
