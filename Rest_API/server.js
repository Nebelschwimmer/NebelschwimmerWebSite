const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3020;
const bodyParser = require('body-parser')
const fs = require('fs');
const fileupload = require('express-fileupload');


// ---Общие переменные для API-----

// Читаем json с музыкой
const readMusicJson = fs.readFileSync("./trackList.json", "utf8")  
// Парсим json с музыкой
const musicArrayParsed = JSON.parse(readMusicJson)
// Генератор id для музыки
let randomTrackID = "id_" + Math.random().toString(16).slice(2)

// -------------------------------







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
  res.status(200).json({ data: trackList });
  });


// Для закачки муз. файла на сервер
app.use(
  fileupload({
    createParentPath: true,
    uriDecodeFileNames: true,
    
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);





// -----------------ПОСТ для закачки и создания нового трека--------------------

app.post('/music/upload', (req, res) => {
  try {
    // Если в запросе нет файла
    if (!req.files || req.files.file.size > 10 * 1024 * 1024) {
      res.send({
        status: 'Failed',
        message: 'File not found or its size is too big',
      });
    } 
    // Если файл на месте
    else {
      // Достаем из FormData запроса файл
      const trackFile = req.files.file;
      // Достаем из FormData запроса остальные пола, т.е. тело
      let formBody = req.body
      // Ставим дефолтную картину, если в форме она не указана
      if (formBody.track_image === '') formBody.track_image = 'https://img.freepik.com/premium-photo/neon-flat-musical-note-icon-3d-rendering-ui-ux-interface-element-dark-glowing-symbol_187882-2481.jpg?size=626&ext=jpg'
    
      // Перемещаем файл в папку
      trackFile.mv('./public/' + trackFile.name);
      // Создаем объект с новым треком
      const newTrack = {
        ...formBody, 
        track_id: randomTrackID, 
        track_likes: [], 
        track_source:`http://localhost:3020/public/${trackFile.name}`
      }
      // Добавляем новый трек к массиву 
      musicArrayParsed.push(newTrack)
      // Переводим обновленный массив в json
      const updatedMusicArray = JSON.stringify(musicArrayParsed)
      // Записываем в json
      fs.writeFileSync('./trackList.json', updatedMusicArray);
      // Переводим объект с новым треком в json
      const resp = JSON.stringify(newTrack, undefined, 2)
      // Отправляем ответ
      res.status(200).send(resp);
      
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// --------------------------------------------------------


//----------------- DELETE для карточек---------------------

app.delete('/music/delete', (req, res) => {
  try {
    // Тело запроса
    const bodyOutsideData = req.body;
    // Забираем из запроса id трэка
    const trackIdFromOutside = bodyOutsideData.track_id;
    
    // Делаем флаг и пустой массив
    let flag = false
    let filteredMusicArray = []
    // Смотрим, если ли в массиве с музыкой объект с тем же id, что в запросе: если да, то флаг - true
    musicArrayParsed.forEach((e)=>{
      if (e.track_id === trackIdFromOutside)
      flag = true
    })
    // Если флаг - true, фильтруем массив с музыкой и записываем его в пустой массив

    if (flag) {
      filteredMusicArray = musicArrayParsed.filter(f => f.track_id !== trackIdFromOutside)
    }
    
    const filteredMusicArrayJSON = JSON.stringify(filteredMusicArray)
    // console.log(filteredMusicArrayJSON)
    // Перезаписываем JSON
    fs.writeFileSync('./trackList.json', filteredMusicArrayJSON);
    // Переводим новый массив в JSON
    const readUpdatedMusicJson = fs.readFileSync("./trackList.json", "utf8") 

    res.status(200).send(readUpdatedMusicJson);
  }
  
  catch (err) {
    res.status(500).send(err);
  }

  }
)








//----------------------------------------------------------
  // GET для json с текстами
  const textsList = require('./texts.json');
  app.get('/texts', (req, res) => {
  res.status(200).json({ data: textsList });
  });


// ----------PATCH для добавления лайка-------------

app.patch(`/music/likes/`, (req, res) => {

  // Тело запроса
  const bodyOutsideData = req.body;
  // Забираем из запроса id трэка
  const trackIdFromOutside = bodyOutsideData.track_id;
  // Забираем из запроса id пользователя
  const userIdFromOutside = bodyOutsideData.user_id;
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
    res.status(200).send(readUpdatedMusicJson);
})





// ----------DELETE для удаления лайка-------------

app.delete('/music/likes', (req, res) => {
    // Тело запроса
  const bodyOutsideData = req.body;
  // Забираем из запроса id трэка
  const trackIdFromOutside = bodyOutsideData.track_id;
  // Забираем из запроса id пользователя
  const userIdFromOutside = bodyOutsideData.user_id;

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
    res.status(200).send(readUpdatedMusicJson);
})

// Открываем доступ к файлам из папки public
app.use('/public', express.static(`${__dirname}/public`));






// Слушаем заданный порт
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
