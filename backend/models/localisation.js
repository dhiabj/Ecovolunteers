const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const localisationSchema = new Schema(
    {
        latitude: {
            type: Number,
            required: true,
            
          },
          longitude: {
            type: Number,
            required: true,
            
          },
          emailuser: {
            type: String,
            required: true,
          },
          
    },
    {
        timestamps: true,
    });

    const Localisation = mongoose.model('Localisation', localisationSchema);

module.exports = Localisation;
