const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()


const User = require('./models/user')




const app = express();

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Connected to a Database')
    }
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//Routers
const productRouter = require('./routes/product')

app.use("/api", productRouter);


app.get("/", (req, res) => {
    res.json("Hello amazon clone")
})

app.post("/", (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err) => {
        if (err) res.json(err);
        else {
            res.json(`${req.body.name} ADD`)
        }
    })
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
