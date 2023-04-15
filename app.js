require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const { logger } = require('./logger');

const { connect } = require('./database')
app.use(express.json());

morgan.format('myformat', '\x1b[36m:date[iso]\x1b[0m \x1b[35m:method\x1b[0m \x1b[33m:url\x1b[0m \x1b[32m:status\x1b[0m :response-time ms - :res[content-length]');
app.use(morgan('myformat'));

const userRouter = require("./user/user.route");
app.use('/api', userRouter);

app.listen(PORT, (err) => {
    if(err) {
        logger.error(err);
    } else {
        connect();
        logger.info(`App running on ${PORT}`);
    }
})