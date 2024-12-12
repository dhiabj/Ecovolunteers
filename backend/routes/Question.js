const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let Question = require('../models/Question');
const User = require('../models/user');

router.get('/questions', (req, res) => {
  Question.find()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/question/:id', (req, res) => {
  Question.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/addQuestion', (req, res) => {
  const { que_title, option1, option2, option3, option4, ans } = req.body;
  if (!que_title || !option1 || !option2 || !option3 || !option4 || !ans) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  const question = new Question({
    que_title,
    option1,
    option2,
    option3,
    option4,
    ans,
  });
  question
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/deleteQuestion/:id', (req, res) => {
  Question.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/updateQuestion/:id', (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/assignPoints/:id', (req, res) => {
  const { score } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { $inc: { points: score } },
    { new: true }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
