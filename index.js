const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const talker = require('./talker.json');
const { readFile, writeFile } = require('./readAndWriteFile');
const { loginValidation, validationName, validationAge, validationTalk,  
  validationWatchedAt, 
  validationRate, 
  validationToken } = require('./Validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', (req, res) => {
  loginValidation(req, res);
  const valor = crypto.randomBytes(8).toString('hex');
  const token = {
    token: valor.slice(0, 16),
  };
  req.headers = {
    authorization: token,
  };
  res.status(200).json(token);
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

app.use(validationToken);

app.post('/talker', 
validationName,
validationAge,
validationTalk,
validationRate,
validationWatchedAt,
async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readFile('./talker.json');
  const id = talkers.length + 1;
  const newTalker = { id, name, age, talk: { watchedAt, rate } };
  await writeFile('./talker.json', newTalker);
  res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
