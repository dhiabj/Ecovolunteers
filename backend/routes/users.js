const router = require('express').Router();
let User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');

const nanoid = require('nanoid');
const nodemailer = require('nodemailer');
const passport = require('passport');
//sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);
const axios = require('axios');
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const SECRET_KEY = process.env.SECRET_KEY;
const sid = process.env.SID;
const auth_token = process.env.AUTH_TOKEN;

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/a/user/:username').get(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  });
});
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Successfully Loged In',
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' });
  }
});
router.get('/google', passport.authenticate('google', ['profile', 'email']));

router.route('/user/:id').get(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route('/register').post(upload.single('pfp'), async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
    }
    res.json({ status: 'ok' });
    axios({
      url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body.recaptchaValue}`,
      method: 'POST',
    })
      .then(async ({ data }) => {
        //console.log(data);
        //console.log(axios.get(data));

        if (data.success) {
          const newPassword = await bcrypt.hash(req.body.password, 10);
          await User.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: newPassword,
            birthday: req.body.birthday,
            address: req.body.address,
            number: req.body.number,
            img: req.file.filename,
            role: 'user',
            recaptchaValue: req.body.recaptchaValue,
          });
          console.log('dkhalna lhouni');
          let user = await User.findOne({ email: req.body.email });

          const { email } = req.body;

          //mail verif

          const ttoken = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
          }).save();

          const url = `${process.env.BASE_URL}users/${user.id}/verify/${ttoken.token}`;

          const send_to = email;
          const sent_from = process.env.EMAIL_USER;
          const reply_to = email;
          const subject = 'Verify your Email';
          const message = url;

          await sendEmail(subject, message, send_to, sent_from, reply_to, url);
          // await sendEmail(user.email, "Verify Email", url);
          // res.status(200).json({ success: true, message: "Email Sent" });

          // res.json(user);
          console.log(data);
        } else {
          return res
            .status(400)
            .json({ message: 'Recaptcha verification failed!' });
          //  res.status(500).json(error.message);
        }
      })
      .catch((error) => {
        console.log(error);
        // res.status(400).json({ message: "Invalid Recaptcha" });
      });
  } catch (err) {
    //res.status(400).json("Error: " + err);
  }
});
router.route('/sms').post(async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  console.log('twilio');
  const twilio = require('twilio')(sid, auth_token);
  if (user != null) {
    twilio.messages
      .create({
        from: '+15075790466',
        to: `+216${user.number}`,
        body: 'ur account has been tried to logged in with a wrong password 3 times!!!',
      })
      .then(function (res) {
        console.log('message has sent!');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});
router.route('/registerr').post(upload.single('pfp'), async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  try {
    if (!user) {
      const newPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: newPassword,
        birthday: req.body.birthday,
        address: req.body.address,
        number: req.body.number,
        img: req.file?.filename,
        role: 'user',
      });
      res.json({ status: 'ok' });
    } else res.json({ status: 'email already used' });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and sign the JWT
    const token = jwt.sign(
      { username: user.username, email: user.email },
      'secret123'
    );
    res.json({ token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//forgot Password
router.route('/ForgetPassword').post(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log('USER==>', user);
  if (!user) {
    return res.json({ error: 'User not Found' });
  }
  const resetCode = nanoid(5).toUpperCase();
  user.resetCode = resetCode;
  user.save();
  //prepare email
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Password reset code',
    html: `<h1>Your Password reset code is:${resetCode}</h1>`,
  };
  //send email
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zachariaachref.salem@esprit.tn',
      pass: '213JMT3008',
    },
  });
  var mailOption = {
    from: 'zachariaachref.salem@esprit.tn',
    to: user.email,
    subject: 'request code',
    html: `<h1>Your Password reset code is:${resetCode}</h1>`,
  };
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:');
    }
  });

  // try{
  //   const data = await sgMail.send(emailData);
  //   console.log(data);
  //   res.json({ok:true});

  // }catch(err){
  //   console.log(err);
  //   res.json({ok:false});
  // }

  res.json({ status: 'ok' });
});

router.route('/ResetPassword').put(async (req, res) => {
  try {
    const { code, password } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    const result = await User.findOneAndUpdate(
      { resetCode: code },
      { password: newPassword },
      { new: true }
    );
    if (result == null) {
      throw new Exception();
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/userconnected').get(async (req, res) => {
  const token = req.headers.authorization;
  //console.log(token);

  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: 'ok', user: user });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});
router.route('/delete/user/:username').delete(async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.params.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.route('/delete/users').delete(async (req, res) => {
  try {
    const usernames = req.body.usernames;
    const deletedUsers = [];
    for (const username of usernames) {
      const user = await User.findOne({ username });
      if (user) {
        await user.remove();
        deletedUsers.push(user);
      }
    }
    res.json({ message: `${deletedUsers.length} users deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/:id/verify/:token/', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: 'Invalid link' });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: 'Invalid link' });

    await User.updateOne({ _id: user._id, verified: true });
    //await token.remove();

    res.status(200).send({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
router.route('/editprofile/:id').put(async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const result = await User.findByIdAndUpdate(id, update, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/editpfp/:id').put(upload.single('pfp'), async (req, res) => {
  const { id } = req.params;
  //console.log(req.file);
  const img = req.file.filename;
  try {
    const result = await User.findByIdAndUpdate(id, { img }, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/addcover/:id').put(upload.single('cover'), async (req, res) => {
  const { id } = req.params;
  //console.log(req.file);
  const cover = req.file.filename;
  try {
    const result = await User.findByIdAndUpdate(id, { cover }, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
