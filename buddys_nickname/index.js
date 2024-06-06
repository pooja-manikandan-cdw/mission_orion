const express = require('express');

const buddyRoutes = require('./routes/buddyRoutes');
const { BUDDY_PATH } = require('./constants/path.contants')

const app = express();

app.use(express.json())
app.use(BUDDY_PATH, buddyRoutes)

app.use((err, req, res, next) => {
    if (! err) {
        return next();
    }

    res.status(500);
    res.send({'Error': err});
});

app.listen(8080, () => {
    console.log('App listening at port 8080');
});