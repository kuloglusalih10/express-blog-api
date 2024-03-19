var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config();
const auth = require('./middleware/auth');

// mongo DB

const mongoose = require('mongoose')
const connectionString = process.env.MONGO_URL

// Routes

const accountRouter = require("./routes/accountRouter");
const categoryRouter = require("./routes/categoryRoutes")

 

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// login , register
app.use("/api/auth", accountRouter);
app.use(auth);
app.use("/api/categories", categoryRouter)


app.get("/", (req, res)=>{
    
    res.send("Hello world")
})


app.use("*", (req,res)=> {
    res.send("404 Not Found")
})




// Connect

mongoose.connect(connectionString).then((result)=>{

    app.listen(3000, ()=>{
        console.log('server çalışıyor')
    });

}).catch(err => console.log(err));