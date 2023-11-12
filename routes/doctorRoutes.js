
const authMiddleware = require("../middlewares/authMiddleware")
const express =require("express")
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require("../controllers/doctorCtrl")
const router = express.Router(); 


//post single doctor info
router.post("/getDoctorInfo", authMiddleware,getDoctorInfoController)

//Post Update profile

router.post("/updateProfile", authMiddleware, updateProfileController)

// post || get single doctor info

router.post('/getDoctorById',authMiddleware, getDoctorByIdController)

//GET appointment 

router.get('/doctor-appointments',authMiddleware,doctorAppointmentsController)

//POST || reject or approve appoint by doctor

router.post('/update-status',authMiddleware, updateStatusController)
module.exports = router