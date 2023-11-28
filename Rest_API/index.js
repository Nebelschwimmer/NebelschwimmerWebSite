const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3020;
const bodyParser = require('body-parser')

app.use(express.json());

// Использование CORS
app.use(cors())
// Используем заголовок для CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Использование bodyParser json
app.use(bodyParser.json());

// GET для json с музыкой
const trackList = require('./trackList.json');
app.get('/music', (req, res) => {
res.json({ data: trackList });
});
// GET для json с текстами
const textsList = require('./texts.json');
app.get('/texts', (req, res) => {
res.json({ data: textsList });
});

// Открываем доступ к файлам из папки public
app.use('/public', express.static(`${__dirname}/public`));

// Слушаем заданный порт
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
