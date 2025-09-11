require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./config/db');

app.use(cors());
app.use(express.json());

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('Bem-vindo ao seu sistema de gestão! O back-end está funcionando.');
});

app.get('/api/test-db', async (req, res) => {
    try {
        const [result] = await db.query('SELECT 1+1 AS solution');
        res.status(200).json({
            message: 'Conexão com o banco de dados bem-sucedida!',
            solution: result[0].solution
        });
    } catch (error) {
        console.error('Erro ao testar conexão com o banco de dados:', error);
        res.status(500).json({
            message: 'Erro ao conectar ao banco de dados',
            error: error.message
        });
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Pressione CTRL+C para parar o servidor.');
});