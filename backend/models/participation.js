const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
   {
      event: {
         type: String, required: true

      },
      eventid: {
         type: String

      },
      userid: {
         type: String, required: true

      },

      date: {
         type: Date,
         required: true,
      },

      type: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      status:
      {
         type:String,
         default: "participating"
      }
      
   }
);

const EventParticipation = mongoose.model("EventParticipation", participationSchema);

module.exports = EventParticipation;