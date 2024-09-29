const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const qrRoutes = require('./routes/qr');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações de sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', qrRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.render('index', { user: req.session.userId });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

