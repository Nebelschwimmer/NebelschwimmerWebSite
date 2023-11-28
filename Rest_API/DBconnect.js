
import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = "mongodb+srv://Nebelschwimmer:165ftvl165ftvl@cluster0.eosyoo6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); 

client.connect().then(mongoClient=>{
  console.log("Подключение установлено");
  console.log(mongoClient.options.dbName); // получаем имя базы данных
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
