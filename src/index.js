const express = require('express');
// const mongoose = require('mongoose');
const redis = require('redis');
const pg = require('pg');

const { Client } = pg;

const app = express();
const port = process.env.PORT || 4000;

// // MongoDB
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo';

// const mongoURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// mongoose.connect(mongoURI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log(err));

// postgres
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';

const URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
  connectionString: URL,
});

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL DB...'))
  .catch((err) =>
    console.log('Failed to connect to PostgreSQL DB:', err)
  );

// Redis
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.log(err);
});

redisClient.connect();

// Save data into Redis
app.get('/', async (req, res) => {
  await redisClient.set('product', 'product...');
  res.send('<h1>Hello</h1>');
});

// Read data from Redis
app.get('/data', async (req, res) => {
  const product = await redisClient.get('product');

  res.send(`<h1>Data from Redis: ${product}</h1>`);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});