const express = require('express');

const buddyRoutes = require('./routes/buddyRoutes');
const { BUDDY_PATH } = require('./constants/path.contants')

const app = express();

app.use(express.json())
app.use(BUDDY_PATH, buddyRoutes)


app.listen(8080, () => {
    console.log('App listening at port 8080');
});