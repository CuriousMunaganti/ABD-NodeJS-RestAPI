const app = require('./src/app');
const express = require('express')
const logger = require('./src/logger/logger');
const redisClient = require('./src/datastore/redis').client;
app.use(express.json())
const PORT = process.env.PORT || '3000'

app.listen(PORT, () => {
    redisClient.connect().then(data => {
        logger.info("Established connection to the redis server")
    }).catch(err => {
        logger.info("Established connection to the redis server", err)
    })
    logger.info(`Started the server on the PORT::${PORT}`)
});