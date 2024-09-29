const express = require('express');
const QRCodeModel = require('../models/QRcode');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');
const router = express.Router();

// Middleware de autenticação
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// Registro de usuário
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        res.status(400).send('Erro ao registrar usuário');
    }
});

// Login de usuário
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.username; 
        res.redirect('/');
    } else {
        res.status(401).send('Usuário ou senha inválidos');
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/');
        res.redirect('/login');
    });
});

// Geração de QR Code
router.post('/qr/generate', async (req, res) => {
    const { url } = req.body;
    try {
        const code = await QRCode.toDataURL(url);
        await QRCodeModel.create({ url, code });
        res.json({ code });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar QR Code' });
    }
});

// Visualizar QR Codes
router.get('/qr/codes', isAuthenticated, async (req, res) => {
    const codes = await QRCodeModel.findAll();
    res.json(codes);
});

// Download do QR Code
router.get('/qr/download/:id', isAuthenticated, async (req, res) => {
    const qrCode = await QRCodeModel.findByPk(req.params.id);
    
    if (qrCode) {
        const imgBuffer = Buffer.from(qrCode.code.split(",")[1], 'base64');
        res.set('Content-Type', 'image/png');
        res.send(imgBuffer);
    } else {
        res.status(404).json({ error: 'QR Code não encontrado' });
    }
});

module.exports = router;

