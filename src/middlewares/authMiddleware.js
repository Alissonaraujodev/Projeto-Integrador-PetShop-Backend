function autenticar(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Acesso negado. Faça login primeiro.' });
}

module.exports = autenticar;
