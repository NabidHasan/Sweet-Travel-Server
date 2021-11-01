const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zsdqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("sweetTravel");
        const servicesCollections = database.collection("services");

        const database2 = client.db("sweetTravel");
        const servicesOrders = database2.collection("myOrder");

        app.get('/services', async (req, res) => {

            const cursor = servicesCollections.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        app.post('/services', async (req, res) => {
            console.log(req.body)
            const service = req.body;
            const result = await servicesCollections.insertOne(service);
            res.json(result)
        });

        //myOrder items

        app.post('/myOrder', async (req, res) => {
            console.log(req.body);
            const service = req.body;
            const result = await servicesOrders.insertOne(service);
            res.json(result)
        })


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