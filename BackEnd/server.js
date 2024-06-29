const express = require("express")

const cors = require('cors')

require('dotenv').config()

const morgan = require('morgan')

const ReceipeRoutes = require('./routes/receipes')

const mongoose = require('mongoose')
const app = express();

const mongoURL = 'mongodb+srv://bibePu:test1234@mern-cluster.2szp4mw.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster'


mongoose.connect(mongoURL).then(()=>{
    console.log('connected to db')
    app.listen(process.env.PORT,()=>{
        console.log('app running on port:'+ process.env.PORT)
    })
})
app.use(cors()) // local develop
app.use(express.json());
app.use(morgan('dev'))


app.get('/',(req,res)=>{
    return res.json({hello : "world"});

})



app.use('/api/receipes',ReceipeRoutes)

