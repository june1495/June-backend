const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Db Connection successfull');
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('backend is running');
});
