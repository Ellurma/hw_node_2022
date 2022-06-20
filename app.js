const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/dec')

const userRouter = require("./routers/user.router");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter)
app.use('*', (req, res) => {
    res.status(404).json('Page not found')
})

app.use((err,req,res,next)=>{
    res
        .status(err.status||400)
        .json({
            error:err.message||'Unknown error',
            code:err.status||400
        })
})

app.listen(5000, () =>
    console.log('Server running on 5000 port'))