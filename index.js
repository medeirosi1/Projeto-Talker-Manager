const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const talker = require('./talker.json');
const { readFile, writeFile } = require('./readAndWriteFile');
const { loginValidation, validationName, validationAge, validationTalk,  
  validationWatchedAt, 
  validationRate, 
  validationToken } = require('./Validations');

const talkerJson = './talker.json';

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
  const teste = await readFile(talkerJson) || [];
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
  const talkers = await readFile(talkerJson);
  const id = talkers.length + 1;
  const newTalker = { id, name, age, talk: { watchedAt, rate } };
  await writeFile(talkerJson, newTalker);
  res.status(201).json(newTalker);
});

app.put('/talker/:id',
validationName,
validationAge,
validationTalk,
validationRate,
validationWatchedAt,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkerForId = await readFile(talkerJson);
  const talkId = talkerForId.findIndex((t) => t.id === Number(id));
  const talkerChange = { ...talkerForId[talkId], name, age, talk: { watchedAt, rate } };
  await writeFile(talkerJson, talkerChange);
  res.status(200).json(talkerChange);
});

app.listen(PORT, () => {
  console.log('Online');
});
