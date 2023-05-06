const router = require('express').Router();
const contoller = require('../controllers/accountController');


//get all the users from accounts collection
router.get("/users", contoller.getUsers);
router.get("/balance/:accountNumber", contoller.getBalance);
router.post("/transfer", contoller.transfer);


module.exports = router;