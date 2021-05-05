const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()


const User = require('./models/user')


const app = express();
app.use(cors());

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
const categoryRouter = require('./routes/category')
const ownerRouter = require('./routes/owner')
const authRouter = require('./routes/auth')
const reviewRouter = require('./routes/review')
const addressRouter = require('./routes/address')
const paymentRouter = require('./routes/payment')

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", ownerRouter);
app.use("/api", authRouter);
app.use("/api", reviewRouter);
app.use("/api", addressRouter);
app.use("/api", paymentRouter);




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

app.listen(8080, () => {
    console.log('http://localhost:8080')
})
