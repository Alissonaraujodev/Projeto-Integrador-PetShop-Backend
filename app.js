require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db');

app.use(cors());
app.use(express.json());

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

app.use(session({
  secret: process.env.SESSION_SECRET,      // 🔒 chave secreta do .env
  resave: false,                           // não salva a sessão se nada mudou
  saveUninitialized: false,                // não cria sessão vazia
  cookie: {
    maxAge: parseInt(process.env.SESSION_MAXAGE) || 3600000, // 1 hora
    secure: process.env.NODE_ENV === 'production',           // true se HTTPS
    httpOnly: true,                                          // evita acesso via JS
  },
}));

app.get('/session-test', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }

  res.send(`Você visitou esta página ${req.session.views} vezes.`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Pressione CTRL+C para parar o servidor.');
});