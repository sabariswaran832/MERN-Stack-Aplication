const express = require("express");
const inserUserModel=require('../controller/insertUserCon')
const getUserModel = require('../controller/getUserDataCon')
const updateUserModel = require('../controller/updateUserData')
const deleteUserModel = require('../controller/deleteUserData')
// const insertReg = require("../controller/rgistercon");
// const insertLog = require("../controller/loginCon");
// const resetpass = require("../controller/resetpassCon");
// const getotpRout = require("../controller/getotpCon");
// const getimageRout = require("../controller/getimageCon");

const router = express.Router();


router.post('/insertUser', inserUserModel.inserUserCon);
router.post('/getUserData',getUserModel.getUserDataCon)
router.put('/updateUserData/:id',updateUserModel.updateUserDataCon)
router.delete('/deleteUserData/:id', deleteUserModel.deleteUserData);

// app.post('/LoginUser', insertLog.insertLoginCon);
// app.post('/reset', resetpass.resetpassCon);
// app.post('/Getotp', getotpRout.getOtpCon);
// app.post('/Getimage', getimageRout.getimageCon);

module.exports = router;
