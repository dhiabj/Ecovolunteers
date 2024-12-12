const express = require('express');
const multer = require('multer');

const {
  getClubsByName,
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
} = require('../controller/ClubController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get('/getClubsByName', getClubsByName);

router.post('/create', createClub);
router.get('/', getClubs);
router.get('/followers/:id', getFollowers);
router.get('/newest', getNewestClubs);
router.get('/club/:id', findClub);
router.get('/created/:id', getClubsCreated);
router.put('/editpfp/:id', upload.single('img'), editPfp);
router.put('/editcover/:id', upload.single('cover'), editCover);
router.put('/createrule/:id', createRule);
router.put('/editrule/:id/:ruleId', editRule);
router.put('/deleterule/:id/:ruleId', deleteRule);
router.get('/search', searchClubs);
router.put('/update/:id', updateClub);
router.delete('/delete/:id/:userId', deleteClub);
router.put('/requesttojoin/:id', requestToJoin);
router.put('/acceptrequest/:id/:userId', acceptRequest);
router.put('/declinerequest/:id/:userId', declineRequest);
router.get('/getrequests/:id', getRequests);
router.get('/joined/:userId', getClubsJoined);
router.put('/leaveclub/:id/:userId', leaveClub);
router.put('/assignrole/:id/:userId', assignRole);
router.put('/kickmember/:id/:userId', kickMember);

module.exports = router;
