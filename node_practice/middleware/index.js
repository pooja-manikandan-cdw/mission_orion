const express = require('express');

const app = express();

const logger = (req, res, next) => {
    console.log('logging...', req.path);
    next();
}

const authorise = (req, res, next) => {
    if(!req.userId) {
        return res.status(400).json({message: "user not authorized"})
    }
    next();
}


const postMiddleware = (req, res, next) => {
    console.log('post middle ware')
    next();
}

app.use(logger);

app.use('/user',authorise)

app.use('/post', postMiddleware)

app.get('/post', (req, res)=>{
    res.send("success")
})

app.listen(8080, () => {
    console.log('app listening at port 8080')
})