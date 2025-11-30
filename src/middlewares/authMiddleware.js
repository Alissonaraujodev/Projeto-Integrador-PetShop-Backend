const jwt = require('jsonwebtoken');

function autorizarVeterinario(req, res, next) {
    const cargo = req.user.cargo; 
  
    const cargosPermitidos = ['Veterinario', 'Administrador'];

    if (!cargo || !cargosPermitidos.includes(cargo)) {
        return res.status(403).json({ message: 'Proibido. Apenas funcionários autorizados.' });
    }

    next();
}

function autorizarAdministrador(req, res, next) {
    const cargo = req.user.cargo; 
  
    const cargosPermitidos = ['Administrador'];

    if (!cargo || !cargosPermitidos.includes(cargo)) {
        return res.status(403).json({ message: 'Proibido. Apenas Admistrador' });
    }

    next();
}

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (token == null) return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido ou expirado.' }); 
        req.user = user; 
        next();
    });
}

module.exports = {  
  autorizarVeterinario, 
  autorizarAdministrador,
  autenticarToken
};


