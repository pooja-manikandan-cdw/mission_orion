const express = require('express');
const cors = require('cors');
require('dotenv').config();
const buddyRoutes = require('./routes/buddyRoutes');
const { BUDDY_PATH } = require('./constants/path.contants');
const errorHandler = require('./middleware/ErrorHandler');

const app = express();

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(BUDDY_PATH, buddyRoutes)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log('App listening at port 8080');
});