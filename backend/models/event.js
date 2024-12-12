const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
   {
      title: {
         type: String

      },
      description: {
         type: String,
         required: true,
      },
      date: {
         type: Date,
         required: true,
      },
      participants: [],
      type: {
         type: String,
         required: true,
      },
      place:
      {
         type: String,
         require: true,
      },
      img: {
         type: String,
      },
      ratings: [
         // {
         //    star: Number,
         //    postedBy: {
         //       type: mongoose.Schema.Types.ObjectId, ref: "User",
         //    },

         // },
      ],
      totalrating: {
         type: String,
         default: 0,
      },
      maxParticipant:
      {
         type: Number,
         required: true,
      },
      status:
      {
         type: String,
         required: true,
         default: "not participating"
      },
      comments:
      [

      ],
      club:
      {
         type:String,
         required:true,
      },
      localisation: {
         type: [Number],
         required: false,
         default: [0, 0],
     }

   }

);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;