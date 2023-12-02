const amqp = require('amqplib');
const logger = require("../logger/logger");

async function publishToQueue(data) {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const queue = 'plan_mq';
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    });
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(error);
    logger.error("Unable to publish to RMQ", error)
  }
}

module.exports = { 
    publishToQueue:publishToQueue
};