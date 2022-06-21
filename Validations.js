const loginValidation = (req, res) => {
    const { email, password } = req.body;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!regex.test(email)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validationAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validationTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    next();
};

const validationWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regexData = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
    if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    if (!regexData.test(watchedAt)) {
        return res.status(400).json({ 
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next(); 
};

const validationRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const validationToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
    next();
};

module.exports = {
    loginValidation,
    validationName,
    validationAge,
    validationTalk,
    validationRate,
    validationWatchedAt,
    validationToken,
};