const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/student/:id', (req,res) => {
    const id = req.params.id
    res.send("hello student id "+id);
})

app.get('/student', (req, res) => {
    const id = req.query.id
    res.send("hello student id "+id);
})

app.listen(8080, () => {
    console.log('app listening at port 8080')
})