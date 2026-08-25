import 'dotenv/config';
import app from "./server.js"
import mongodb, { MongoClient } from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

// const mongoClient =mongodb.MongoClient 
// const mongo_username = process.env['MONGO_USERNAME']
// const mongo_password = process.env['MONGO_PASSWORD']
// const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.vmx9h34.mongodb.net/?appName=Cluster0`

// const port= process.env.PORT
const mongoClient = mongodb.MongoClient;  // fix typo
const uri = process.env['MONGO_URI'] || 'fallback_uri';  // read from .env
const port = process.env['PORT'] || 3000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS:2500,
       // useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })