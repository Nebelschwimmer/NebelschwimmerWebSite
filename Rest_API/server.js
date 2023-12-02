const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3020;
const bodyParser = require('body-parser')
const fs = require('fs');


app.use(express.json());

// Использование CORS
app.use(cors())
// Используем заголовок для CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Использование bodyParser json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
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


// Читаем JSON


 // -----CДЕЛАТЬ ОТДЕЛЬНЫЙ ЭНДПОИНТ ДЛЯ РЕДАКТИРОВАНИЯ МУЗ. КАРТОЧКИ ПО ДАННЫМ ИЗ ФОРМЫ-------
  // Забираем из запроса имя трэка
  // const trackNameOutside = bodyOutsideData.track_name;
  // Изменяем имя трэка по данным запроса
  // Пробегаемся по массиву: если id в исходном массиве и из тела запроса совпадают, изменяем имя трэка 
  // на то, что пришло из запроса 
  // musicArrayParsed.forEach(e => {
  // if (e.track_id === trackIdFromOutside)
  // e.track_name = trackNameOutside
  // });



// ----------PATCH для добавления лайка-------------

app.patch('/music/likes', (req, res) => {
  const readMusicJson = fs.readFileSync("./trackList.json", "utf8")  
  // Тело запроса
  const bodyOutsideData = req.body;
  // Забираем из запроса id трэка
  const trackIdFromOutside = bodyOutsideData.track_id;
  // Забираем из запроса id пользователя
  const userIdFromOutside = bodyOutsideData.user_id;
  // Парсим массив
  const musicArrayParsed = JSON.parse(readMusicJson)
  // Добавляем id юзера из тела запроса к массиву лайков
  musicArrayParsed.forEach(e => {
      if (e.track_id === trackIdFromOutside)
          e.track_likes.push(userIdFromOutside)
      }
    );
  // Обратно переводим в JSON
  const updatedMusicArray = JSON.stringify(musicArrayParsed)
  // Перезаписываем JSON
  fs.writeFileSync('./trackList.json', updatedMusicArray);
  const readUpdatedMusicJson = fs.readFileSync("./trackList.json", "utf8") 
  // Отправляем ответ с обновленным JSON
    res.send(readUpdatedMusicJson);
})

// ----------DELETE для удаления лайка-------------

app.delete('/music/likes', (req, res) => {
  const readMusicJson = fs.readFileSync("./trackList.json", "utf8")  
    // Тело запроса
  const bodyOutsideData = req.body;
  // Забираем из запроса id трэка
  const trackIdFromOutside = bodyOutsideData.track_id;
  // Забираем из запроса id пользователя
  const userIdFromOutside = bodyOutsideData.user_id;
  // Парсим массив
  const musicArrayParsed = JSON.parse(readMusicJson)

  // Проходимся по массиву
  musicArrayParsed.map((e) => {
    //Объявляем мутабельную переменную 
    let likesFiltered
      // Если id трэка совпадает с тем, что пришел от клиента, в мутабельную переменную likesFiltered 
      // записываем отфильтрованный массив по принципу, чтобы убрать id юзера, который захотел убрать лайк.
      // Перезаписываем массив лайков на отфильтрованный массив
      if (e.track_id === trackIdFromOutside) {
          likesFiltered = e.track_likes.filter((f) => f !== userIdFromOutside)
          e.track_likes = likesFiltered
      } 
    }
  );
  // Обратно переводим в JSON
  const updatedMusicArray = JSON.stringify(musicArrayParsed)

  // Перезаписываем JSON
  fs.writeFileSync('./trackList.json', updatedMusicArray);
  const readUpdatedMusicJson = fs.readFileSync("./trackList.json", "utf8") 
  // Отправляем ответ с обновленным JSON
    res.send(readUpdatedMusicJson);
})

// Открываем доступ к файлам из папки public
app.use('/public', express.static(`${__dirname}/public`));

// Для скачивания
app.get('music//download', function(req, res){
  const bodyOutsideData = req.body;
  const trackSource = bodyOutsideData.track_source;
  const trackToDownload = `${__dirname}/public/${trackSource}`;
  res.download(trackToDownload);
});


// Слушаем заданный порт
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
