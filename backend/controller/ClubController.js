let ClubModel = require('../models/clubModel');
let User = require('../models/user');
const mongoose = require('mongoose');

const createClub = async (req, res) => {
  try {
    const { name, description, userId, privacy, members } = req.body;
    // const { img, cover } = req.files ? req.files : [];
    const clubId = mongoose.Types.ObjectId();
    const club = new ClubModel({
      _id: clubId,
      name,
      description,
      privacy,
      userId,
      // img: img ? img[0].filename : '',
      // cover: cover ? cover[0].filename : '',
      members: members ? members : [],
    });
    await club.save();
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { clubs: clubId.toString() },
        role: 'club_owner',
      },
      { new: true }
    );
    res.status(200).send({ club, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const followers = await User.find({ _id: { $in: user.followers } });
    res.status(200).send(followers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getClubs = async (req, res) => {
  try {
    // const clubs = await ClubModel.find().populate({
    //   path: 'members.userId',
    //   select: '-following -followers -password -__v -createdAt -updatedAt',
    // });
    const clubs = await ClubModel.find({ privacy: 'public' });
    res.status(200).send(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getClubsByName = async (req, res) => {
  try {
    // const clubs = await ClubModel.find().populate({
    //   path: 'members.userId',
    //   select: '-following -followers -password -__v -createdAt -updatedAt',
    // });
    const clubs = await ClubModel.find({}, { name: true, _id: false });
    res.status(200).send(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getNewestClubs = async (req, res) => {
  try {
    const clubs = await ClubModel.find({ privacy: 'public' })
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).send(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const findClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await ClubModel.findById(id)
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.send(club);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getClubsCreated = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const clubs = await ClubModel.find({ _id: { $in: user.clubs } });
    //console.log(clubs);
    res.status(200).send(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const editPfp = async (req, res) => {
  const { id } = req.params;
  //console.log(req.file);
  const img = req.file.filename;
  try {
    const result = await ClubModel.findByIdAndUpdate(id, { img }, { new: true })
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editCover = async (req, res) => {
  const { id } = req.params;
  //console.log(req.file);
  const cover = req.file.filename;
  try {
    const result = await ClubModel.findByIdAndUpdate(
      id,
      { cover },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRule = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await ClubModel.findByIdAndUpdate(
      id,
      { $push: { rules: { title, description } } },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editRule = async (req, res) => {
  const { id, ruleId } = req.params;
  const { title, description } = req.body;
  try {
    const result = await ClubModel.findOneAndUpdate(
      { _id: id, 'rules._id': ruleId },
      { $set: { 'rules.$.title': title, 'rules.$.description': description } },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRule = async (req, res) => {
  const { id, ruleId } = req.params;
  try {
    const result = await ClubModel.findOneAndUpdate(
      { _id: id },
      { $pull: { rules: { _id: ruleId } } },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchClubs = async (req, res) => {
  try {
    const { name } = req.query;
    const clubs = await ClubModel.find({
      name: { $regex: new RegExp(name, 'i') },
    });
    res.status(200).json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateClub = async (req, res) => {
  const { id } = req.params;
  const { name, description, privacy } = req.body;
  try {
    const result = await ClubModel.findByIdAndUpdate(
      id,
      { name, description, privacy },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClub = async (req, res) => {
  const { id, userId } = req.params;
  try {
    await ClubModel.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { clubs: id } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const requestToJoin = async (req, res) => {
  try {
    const clubId = req.params.id;
    const userId = req.body.userId;

    const club = await ClubModel.findById(clubId)
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    const user = await User.findById(userId);
    club.joinRequests.push(user);
    await club.save();
    res.status(200).json(club);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

const acceptRequest = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const club = await ClubModel.findById(id);
    club.members.push({ userId: userId });
    await club.save();
    const result = await ClubModel.findOneAndUpdate(
      { _id: id },
      { $pull: { joinRequests: userId } },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const declineRequest = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const result = await ClubModel.findOneAndUpdate(
      { _id: id },
      { $pull: { joinRequests: userId } },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRequests = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ClubModel.findById(id).populate({
      path: 'joinRequests',
      select: 'firstname lastname username img role',
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClubsJoined = async (req, res) => {
  const { userId } = req.params;
  try {
    const clubs = await ClubModel.find({
      members: { $elemMatch: { userId: userId } },
    });
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const leaveClub = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const result = await ClubModel.findOneAndUpdate(
      { _id: id },
      { $pull: { members: { userId: userId } } },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const assignRole = async (req, res) => {
  const { id, userId } = req.params;
  const { isClubAdmin } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { isClubAdmin }, { new: true });
    const result = await ClubModel.findById(id)
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const kickMember = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const result = await ClubModel.findOneAndUpdate(
      { _id: id },
      { $pull: { members: { userId: userId } } },
      { new: true }
    )
      .populate({
        path: 'members.userId',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      })
      .populate({
        path: 'joinRequests',
        select:
          'firstname lastname username img role isClubAdmin points eventsAttended',
      });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createClub,
  getClubs,
  getFollowers,
  getNewestClubs,
  findClub,
  getClubsCreated,
  editPfp,
  editCover,
  createRule,
  editRule,
  deleteRule,
  searchClubs,
  updateClub,
  deleteClub,
  requestToJoin,
  acceptRequest,
  declineRequest,
  getRequests,
  getClubsJoined,
  leaveClub,
  assignRole,
  kickMember,
  getClubsByName,
};
