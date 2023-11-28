import {client} from './DBconnect.js'

export const getTexts = (req, res) => {
  client.connect((err) => {
      if(err) {
          res.status(500).send(err);
          return;
      }
      const collection = client.db('MyPersonalWebSite').collection('Texts');
      collection.find().toArray((err, result) => {
          if(err) res.status(500).send(err);
          if(result) res.json(result);
          client.close();
      });
  });
};


// add new car : POST
export const postTexts = (req, res) => {
  client.connect((err) => {
      if(err) {
          res.status(500).send(err);
          return;
      }
      const text = req.body;
      const collection = client.db('MyPersonalWebSite').collection('Texts');
      collection.insertOne(text, (err, result) => {
          if(err) res.status(500).send(err);
          if(result) res.json(result);
          client.close();
      });
  });
  
};

// update car with id
export const updateTextById = (req, res) => {
  client.connect((err) => {
      if(err) {
          res.status(500).send(err);
          return;
      }
      const textId = req.params.id;
      const text = req.body;
      const collection = client.db('MyPersonalWebSite').collection('Texts');
      collection.updateOne(
          { _id: ObjectId(textId) },
          {  $set: car },
          (err, result) => {
              if(err) res.status(500).send(err);
              if(result) res.json(result);
              client.close();
          }
      )
  })
};