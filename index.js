const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const talker = require('./talker.json');
const { readFile } = require('./readAndWriteFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const teste = await readFile('./talker.json') || [];
  res.status(200).json(teste);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talk = talker.find((t) => t.id === Number(id));

  if (!talk) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talk);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  const valor = crypto.randomBytes(8).toString('hex');
  const token = {
    token: valor.slice(0, 16),
  };
  res.status(200).json(token);
});

app.listen(PORT, () => {
  console.log('Online');
});
