// const {upperCase} = require('upper-case');
const express = require('express')

// upperCase("string"); //=> "STRING"

const app = express();

app.listen(3000, () => {
    console.log('App listeing at port 3000')
})

// localeUpperCase.localeUpperCase("string", "tr"); //=> "STRİNG"