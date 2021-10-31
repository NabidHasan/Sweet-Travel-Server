const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zsdqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        console.log("Connected database")

    }
    finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running Sweet server')
});

app.listen(port, () => {
    console.log('Running Sweet server', port);
})