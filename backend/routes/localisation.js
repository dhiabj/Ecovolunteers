const router = require('express').Router();
let Localisation=require('../models/localisation');


router.route('/').get((req, res) => {
    Localisation.find()
      .then((Localisations) => res.json(Localisations))
      .catch((err) => res.status(400).json('Error: ' + err));
  });

  router.route('/Localisation/:id').get(async (req, res) => {
    const localisation = await Localisation.findById(req.params.id);
    res.send(localisation);
  });

  router.route('/createlocalisation').post( async (req, res) => {
    const { latitude, longitude, emailuser } = req.body;
  
    try {
      const newLocalisation = new Localisation({
        latitude,
        longitude,
        emailuser
      });
      const savedLocalisation = await newLocalisation.save();
      res.status(201).json(savedLocalisation);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  module.exports = router;