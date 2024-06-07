const express = require('express')

const localPackage = require('./localPackage')


const app = express();

app.use('/', (req, res)=>{
    res.send(localPackage('pooja'));
})

app.listen(3000, () => {
    console.log('App listeing at port 3000')
})

// localeUpperCase.localeUpperCase("string", "tr"); //=> "STRİNG"