const { Router } = require("express");
const { checkBanned,banUser, ban }= require("../controller/usercontroller");
//const { banUser, ban } = require('./controller/usercontroller');
const router = Router();

//router.put("/ban/:username", usercontroller.ban);


router.post('/ban/:username',  banUser, ban);
router.get('/test-check-banned', checkBanned, (req, res) => {
    res.send('This route is accessible only if user is not banned');
});


module.exports = router;
