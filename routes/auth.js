/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
// REGISTER

router.post('/register', async (req, res) => {
  const { body } = req;
  const newUser = new User({
    name: body.name,
    email: body.email,
    password: cryptoJs.AES.encrypt(
      body.password,
      process.env.PASS_SEC,
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post('/login', async (req, res) => {
  const { body } = req;
  try {
    const user = await User.findOne({ email: body.email });
    !user && res.status(401).json('wrong credentials');

    const hashedPassword = cryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC,
    );
    const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
    originalPassword !== body.password &&
      res.status(401).json('Wrong credentials');

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: 86400 },
    );

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
