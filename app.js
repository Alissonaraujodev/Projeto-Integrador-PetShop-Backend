require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./src/config/database');

app.use(cors());
app.use(express.json());

// Rota de teste simples
app.get('/', (req, res) => {
  res.send('Bem-vindo ao seu sistema de gestão! O back-end está funcionando.');
});

// Função para iniciar o servidor e testar a conexão com o banco de dados
async function startServer() {
  try {
    // Tenta obter uma conexão para testar o banco de dados
    const connection = await db.getConnection();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    connection.release(); // Libera a conexão imediatamente

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
      console.log('Pressione CTRL+C para parar o servidor.');
    });
  } catch (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
    process.exit(1); // Encerra a aplicação se não houver conexão com o DB
  }
}

// Chama a função para iniciar tudo
startServer();