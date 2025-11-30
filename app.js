require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./src/config/db');

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost",
  "http://127.0.0.1"
];

app.use(cors({

   origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
   },
   credentials: false, 
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./src/routes/funcionariosRoutes'));
app.use('/', require('./src/routes/clientesRoutes'));
app.use('/', require('./src/routes/petsRoutes'));
app.use('/', require('./src/routes/servicosRoutes'));
app.use('/', require('./src/routes/agendamentosRoutes'));
app.use('/', require('./src/routes/verificacaoRoutes'));
app.use('/', require('./src/routes/servicoProfissionalRoutes'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
