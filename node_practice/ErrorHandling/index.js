const express = require('express');
const ErrorHandler = require('./middleware/ErrorHandler');
const AppError = require('./utils/AppError');

const app = express();


app.get('/', (req, res, next) => {
    try {
        // throw new Error('my error thrown')
        throw new AppError(301, "Tried my custom app error", 400)
    } catch(err) {
        next(err)
    }
})


app.use(ErrorHandler)

app.listen(8080, () => {
    console.log('app listening at port 8080');
})