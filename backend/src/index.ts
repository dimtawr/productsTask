import express from 'express';
import cors from 'cors';
import respondWith from './common/respondWith';
import errorHandler from './common/errorHandler';
import products from './features/products';
import users from './features/users';

require('dotenv').config('.env');

const app = express();
const port = Number(process.env.NODE_PORT);
const host = String(process.env.NODE_HOST);
app.use(cors());
app.use(respondWith);
app.listen(port, host, () => {
  console.info(`--> Server started, listen to ${host}:${port}`);
});

app.use('/products', products);
app.use('/users', users);

app.use(errorHandler());
