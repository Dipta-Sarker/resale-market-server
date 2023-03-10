const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()


app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_PASSWORD}@cluster0.rxjlfn3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        const laptopsCollection = client.db('resaleMarket').collection('laptops')
        
        app.get('/laptops', async(req,res)=>{
            const query ={}
            const result = await laptopsCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/laptops/:id', async(req,res)=>{
            const id = req.params.id
            console.log(id)
            const query ={_id:ObjectId(id)}
            const result = await laptopsCollection.find(query).toArray()
            res.send(result)
        })

        

    }
    finally {

    }
}
run().catch(e => console.log(e))





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})