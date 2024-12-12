const express = require('express');
const Event = require('../models/event');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');
const participation = require('../models/participation');
const moment = require('moment');
const { ObjectId } = require('mongodb');
const sendEmail = require('../utils/sendEmail');
const nodemailer = require('nodemailer');

router.get('/comments/:id', async (req, res) => {
  try {
    Event.findOne(
      { _id: req.params.id },
      { _id: 0, comments: 1 },
      (err, event) => {
        if (err) {
          console.error(err);
        }

        const comments = event.comments;
        // console.log(comments);
        res.status(200).json(comments);
      }
    );
  } catch (error) {}
});

//CREATE
router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.route('/addEvent').post(upload.single('pfp'), async (req, res) => {
  //console.log(req.body);
  try {
    await Event.create({
      title: req.body.title,
      place: req.body.place,
      type: req.body.type,
      maxParticipant: req.body.maxParticipant,
      date: req.body.date,
      description: req.body.description,
      img: req.file.filename,
      club: req.body.club,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
  }
});
//UPDATE
////router.put("/:id", verifyAdmin, updateHotel);
router.put('/', async (req, res) => {
  try {
    const usernames = req.body.usernames;
    const deletedUsers = [];
    for (const username of usernames) {
      const user = await Event.findOne({ username });
      if (user) {
        await user.remove();
        deletedUsers.push(user);
      }
    }
    res.json({ message: `${deletedUsers.length} events deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//DELETE
//router.delete("/:id", verifyAdmin, deleteHotel);
router.delete('/', async (req, res) => {
  try {
    const usernames = req.body.usernames;
    const deletedUsers = [];
    for (const username of usernames) {
      const user = await Event.findOne({ username });
      if (user) {
        await user.remove();
        deletedUsers.push(user);
      }
    }
    res.json({ message: `${deletedUsers.length} events deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//GET
router.route('/editEvent/:id').put(async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const result = await Event.findByIdAndUpdate(id, update, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
///router.get("/find/:id", getHotel);
router.get('/find/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/findClub/:club', async (req, res) => {
  try {
    const club = req.params.club;
    //const club="clubb";
    const event = await Event.find({ club });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});
///////////////////////GET ALL EVENTS///////////////
router.get('/', async (req, res) => {
  try {
    //const club=req.params.club;
    //const club="clubb";

    //  const Events = await Event.find();
    const Events = await Event.find();

    res.status(200).json(Events);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/send', async (req, res) => {
  try {
    //     const currentDate = new Date(); // Create a new Date object representing the current date and time
    //    const eventDate = new Date("2023-04-18T23:44:00.000+00:00"); // Convert the eevent date string to a Daete object

    //     const events = await Event.find({ date: { $gte: eventDate, $lte: currentDate } }); // Find events that occur on or after the event date and on or before the current date
    //      // const eventDate = new Date(event.date);

    //const Events = await Event.find();

    // const currentDate = new Date(); // Create a new Date object representing the current date and time

    // const events = await Event.find({ date: { $gte: eventDate, $lte: currentDate } }); // Find events that occur on or after the event date and on or before the current date

    // const eventsWithDate = events.map(event => {
    //   const eventDate = new Date(event.date);
    //   return { ...event, eventDate };
    // });
    const eventsWithDate = events.map((event) => {
      const eventDate = new Date(event.date);
      eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();
    });
    // event.date.toDateString === "Mon Apr 17 2023"
    //         });
    //           console.log(todayEvents);
    //         todayEvents.forEach((event) => {
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'ecovolunteerss@gmail.com',
    //       pass: 'jsfoxebofntumodb'
    //     }
    //   });

    //   // Define email options
    //   const mailOptions = {
    //     from: 'ecovolunteerss@gmail.com',
    //     to: 'ayaouertatani@esprittn',
    //     subject: `Reminder: ${event.title}`,
    //     text: `Don't forget about ${event.title} on ${event.date}.`
    //   };
    // Send email using transporter object
    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.error(`Error sending email for event ${event.title}: ${error}`);
    //     } else {
    //       console.log(`Email sent for event ${event.title}: ${info.response}`);
    //     }
    //   });

    //             });

    // Now you can use the `eventsWithDate` array to display your events list with the `eventDate` field included

    // Now you can use the `eventsWithDate` array to display your events list with the `eventDate` field included

    // Now you can use the `eventsWithDate` array to display your events list with the `eventDate` field included

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});
//router.get("/", getHotels);
//router.get("/countByCity", countByCity);
router.get('/countByType', async (req, res) => {
  const types = req.query.types?.split(',');
  try {
    const list = await Promise.all(
      types.map((type) => {
        return Event.countDocuments({ type: type });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//router.get("/countByType", countByType);
//router.get("/room/:id", getHotelRooms);

//participation

router.post('/participate', async (req, res) => {
  const { event, eventid, userid, date, type, title } = req.body;

  try {
    const newParticipation = new participation({
      event,
      eventid,
      userid,
      date,
      type,
      title,
    });
    const user = await User.findByIdAndUpdate(
      userid,
      { $inc: { points: 20, eventsAttended: 1 } },
      { new: true }
    );

    console.log(user);
    const particip = await newParticipation.save();
    res.send('participation registred');
    const evtemp = await Event.findOne({ _id: event._id });

    evtemp.participants.push({
      participationid: particip._id,
      userid: userid,
      firstname: user.firstname,
      lastname: user.lastname,
    });

    evtemp.status = 'participating';
    evtemp.maxParticipant -= 1;
    await evtemp.save();
  } catch (error) {
    // return res.status(400).json({ error });
  }
});

router.get('/getAllByType', async (req, res) => {
  try {
    const types = await Event.find({}, { _id: false, type: true }).distinct(
      'type'
    );
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/getparticipbyuserid', async (req, res) => {
  const userid = req.body.userid;

  try {
    const partcps = await participation.find({ userid: userid });
    res.status(200).json(partcps);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/getparticipbyuseridd', async (req, res) => {
  const userid = req.body.userid;

  try {
    const partcps = await participation.find({
      userid: userid,
      status: 'participating',
    });
    res.status(200).json(partcps);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/cancelpart', async (req, res) => {
  const partid = req.body.partid;
  const event = req.body.event;

  try {
    const parts = await participation.findOne({ _id: partid });
    console.log(parts);
    parts.status = 'cancelled';
    await parts.save();
    const eventt = await Event.findOne({ _id: event });
    eventt.status = 'cancelled';

    console.log(eventt);
    const particip = eventt.participants;
    const temp = particip.filter(
      (parts) => parts.participationid.toString() !== partid
    );
    console.log(temp);
    eventt.participants = temp;
    await eventt.save();
    res.send('Your participation cancelled successfully');
  } catch (error) {
    console.log(error);
  }
});
router.post('/deleteComment', async (req, res) => {
  const eventid = req.body.eventid;
  const commentid = req.body.commentid;
  console.log(eventid, commentid);
  try {
    const eventt = await Event.findOne({ _id: eventid });

    console.log('event cherche' + eventt);
    const particip = eventt.comments;
    const temp = particip.filter((parts) => parts._id.toString() !== commentid);
    console.log(temp);
    eventt.comments = temp;
    console.log('comments qui restent' + eventt);
    await eventt.save();
    res.send('Your participation cancelled successfully');
  } catch (error) {
    console.log(error);
  }
});
router.post('/rating', async (req, res) => {
  const userid = req.body.userid;
  const evid = req.body.evid;
  const rating = req.body.rating;
  //  console.log(userid,evid,rating)
  try {
    const event = await Event.findById({ _id: evid });
    console.log(event);
    let alreadyRated = event.ratings.find(
      (userId) => userId.postedby.toString() === userid
    );
    if (alreadyRated) {
      const updateRating = await Event.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { 'ratings.$.star': rating },
        }
        //         {
        //             new: true,
        //         }
      );
      res.json(updateRating);
    } else {
      const rateEvent = await Event.findByIdAndUpdate(
        evid,
        {
          $push: {
            ratings: {
              star: rating,
              postedby: userid,
            },
          },
        },
        {
          new: true,
        }
      );

      const getallratings = await Event.findById(evid);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = ratingsum / totalRating;
      let finalEvent = await Event.findByIdAndUpdate(
        evid,
        {
          totalrating: actualRating,
        },
        {
          new: true,
        }
      );
      res.json(finalEvent);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/addComment', async (req, res) => {
  const {
    eventid,
    userid,
    firstname,
    lastname,
    image,

    contenu,
  } = req.body;
  try {
    const newComment = {
      contenu: contenu,
      createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      userId: userid,
      eventId: eventid,
      firstname: firstname,
      lastname: lastname,
      image: image,
      _id: new ObjectId(),
    };
    const event = await Event.findOne({ _id: eventid });

    event.comments.push(newComment);

    await event.save();
    console.log(event.comments);
  } catch (error) {
    // return res.status(400).json({ error });
    console.log(error);
  }
});
router.put('/:id/localisation', async (req, res) => {
  const { localisation } = req.body;
  const event = await Event.findById(req.params.id);
  event.localisation = localisation;
  await event.save();
  res.json(event);
});
module.exports = router;
