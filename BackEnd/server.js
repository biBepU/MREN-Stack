const express = require("express")

const cors = require('cors')

require('dotenv').config()

const morgan = require('morgan')
const cron = require('node-cron');
const ReceipeRoutes = require('./routes/receipes')
const UserRoutes = require('./routes/User')
const AuthMiddleware = require('./middleware/authMiddleware')
const User = require('./models/User')
const mongoose = require('mongoose')
const app = express();
const sendEmail = require('./harper/sendEmail')


app.use(express.static('public'))
const mongoURL = 'mongodb+srv://bibePu:test1234@mern-cluster.2szp4mw.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster'

const cookieParser = require('cookie-parser')

app.set('views','./views')
app.set('view engine','ejs')
mongoose.connect(mongoURL).then(()=>{
    console.log('connected to db')
    app.listen(process.env.PORT,()=>{
        console.log('app running on port:'+ process.env.PORT)
        cron.schedule('*/4 * * * * *',async () => {
           let user = await User.findByIdAndUpdate('668679eef17ce8ec39dac7c1',{
            name : "mg mg"+Math.random()
           })
          });
    })
})
app.use(cors(
    {
        origin : 'http://localhost:5173',
        credentials : true

    }
)) // local develop
app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser())


app.get('/',(req,res)=>{
    return res.json({hello : "world"});

})

// app.get('/set-cookie',(req,res)=>{
//     // res.setHeader('Set-Cookie','name=Htetmyat')
//     res.cookie('name','aungaung')

//     res.cookie ('important-key','value',{httpOnly:true})

//     return res.send('cookie already set')
// })

app.get('/send-email', async(req, res) => {
 try{
    await sendEmail({
        view : "email",
        data : {
            name :"baby boo"
        },
        from : "htet@gmail.com",
        to : "eiwai@gmail.com",
        subject :"Hello baby boo"
     })
     return res.send('Email already sent')
 }catch(e){
    return res.status(500).json({
        message : e.message,
        status : 500
    })
 }
  });
app.get('/get-cookie',(req,res)=>{

    let cookies = req.cookies
    return res.json(cookies)
})

app.use('/api/receipes',AuthMiddleware,ReceipeRoutes)

app.use('/api/users',UserRoutes)

