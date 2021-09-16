const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userService = require('../api-services/user-services');


router.post("/user/create",auth, userService.createUser);
router.post("/user/login", userService.loginUser);


module.exports = router;