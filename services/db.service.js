// var dbConn = null;

// function connectToMongo() {
//     // Reuse existing connection if exist
//     if (dbConn) return Promise.resolve(dbConn);
//     const MongoClient = require('mongodb').MongoClient;
    
//     // const url = (!process.env.PORT)? 
//     //                 'mongodb://localhost:27017/prefix_db' : 'mlab url'
//     const url = 'mongodb://localhost:27017/prefix_db'
//     // const url = 'mongodb+srv://eslcoding:Coding11@cluster0.r0pfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    
//     return MongoClient.connect(url)
//         .then(client => {
//             console.log('Connected to MongoDB');

//             // If we get disconnected (e.g. db is down)
//             client.on('close', ()=>{
//                 console.log('MongoDB Diconnected!');
//                 dbConn = null;
//             })
//             dbConn = client.db()
//             return dbConn;
//         })
// }

// module.exports = {
//     connect : connectToMongo
// }








const MongoClient = require('mongodb').MongoClient;

// const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'prefix_db';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    const url = 'mongodb+srv://eslcoding:Coding11@cluster0.r0pfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}




