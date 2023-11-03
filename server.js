require('dotenv').config()
const app = require('./src/app');
const express = require('express')
const logger = require('./src/logger/logger');
const redisClient = require('./src/services/redis').client;
app.use(express.json())
const PORT = process.env.APP_PORT || '8080'

app.listen(PORT, () => {
    redisClient.connect().then(data => {
        logger.info("Established connection to the redis server")
    }).catch(err => {
        logger.error("Unable to establish connection to the redis server", err)
    })
    logger.info(`Started the server on the PORT::${PORT}`)
});