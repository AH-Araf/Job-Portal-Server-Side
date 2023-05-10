const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// middle wares
app.use(cors());
app.use(express.json()); 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hnkiytr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const usersCollectionApp = client.db('Assignment12').collection('appUsers');
        const sellDetails = client.db('Assignment12').collection('sellDetails');
        const productDetails = client.db('Assignment12').collection('productDetails');
       


    //Get Users
    app.get('/appUsers', async (req, res) => {
        let query = {};
        const cursor = usersCollectionApp.find(query);
        const a = await cursor.toArray();
        res.send(a);
    });

    //Post Users
    app.post('/appUsers', async (req, res) => {
        const user = req.body;
        const result = await usersCollectionApp.insertOne(user);
        res.send(result);
    });

    //Get Users by Role
    app.get('/appUserEmail', async (req, res) => {
        let query = {};

        if (req.query.email) {
            query = {
                email: req.query.email
            }
        }
        const cursor = usersCollectionApp.find(query);
        const review = await cursor.toArray();
        res.send(review);
    });



    //Post Customer Details
    app.post('/customerInfo', async (req, res) => {
        const user = req.body;
        const result = await sellDetails.insertOne(user);
        res.send(result);
    });


    //Get Customer Details
    app.get('/customerInfo', async (req, res) => {
        let query = {};
        const cursor = sellDetails.find(query).sort({$natural:-1});
        const a = await cursor.toArray();
        res.send(a);
    });


    //Get Single Customer Details
    app.get('/singleDetails/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const b = await sellDetails.findOne(query);
        res.send(b);
    });
    

    
    






    }
    finally{

    }
}

run().catch(err => console.error(err))


app.get('/',(req,res)=>{
    res.send('App Server Running')
})

app.listen(port, ()=>{
    console.log(`App Server Running${port}`)
})