const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoutes = require('./api/products')
const orderRoutes = require('./api/orders')
const mongoose = require('mongoose')

mongoose.connect('mongodb://rest-api:rest-api@rest-api-shard-00-00-9r1ez.mongodb.net:27017,rest-api-shard-00-01-9r1ez.mongodb.net:27017,rest-api-shard-00-02-9r1ez.mongodb.net:27017/test?ssl=true&replicaSet=rest-api-shard-0&authSource=admin')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//CORS Handeling
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, GET, DELETE, PATCH, POST')
    return res.status(200).json({})
    }
    next()
})
//end



app.use('/api/products',productRoutes)
app.use('/api/orders',orderRoutes)

//error handeling

app.use((req,res,next)=>{
    const error = new Error('Not Found sorry... :(')
    error.status = 404
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
})


module.exports = app