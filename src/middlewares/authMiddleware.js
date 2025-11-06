function autenticar(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Acesso negado. Faça login primeiro.' });
}

function autorizarVeterinario(req, res, next) {
    const cargo = req.session.userCargo; 
  
    const cargosPermitidos = ['Veterinario', 'Administrador'];

    if (!cargo || !cargosPermitidos.includes(cargo)) {
        return res.status(403).json({ message: 'Proibido. Apenas funcionários autorizados.' });
    }

    next();
}

function autorizarAdministrador(req, res, next) {
    const cargo = req.session.userCargo; 
  
    const cargosPermitidos = ['Administrador'];

    if (!cargo || !cargosPermitidos.includes(cargo)) {
        return res.status(403).json({ message: 'Proibido. Apenas Admistrador' });
    }

    next();
}

module.exports = { 
  autenticar, 
  autorizarVeterinario, 
  autorizarAdministrador 
};


