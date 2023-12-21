const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
// built in middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vqva6ft.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // Send a ping to confirm a successful connection
        const todoCollection = client.db('TaskDB').collection('todoList')
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.post('/todo',async(req,res)=>{
            const task = req.body
            const result = await todoCollection.insertOne(task)
            res.send(result)
        })
        app.get('/todo', async(req,res)=>{
            const result = await todoCollection.find().toArray()
            res.send(result)
        })
    } finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Task Manager app is running')

})
app.listen(port, () => {
    console.log(`Port is running at port: ${port}`)
})