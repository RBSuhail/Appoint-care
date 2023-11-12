const express=require("express");
const { loginController,
     registerController, 
     authController,
     applyDoctorController,
     getAllNotificationController,
     deleteAllNotificationController, 
     getAllDoctorsController, 
     bookAppointmentController, 
     bookingAvailabilityController,
     userAppointmentsController} = require("../controllers/userCtrl");

const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
//login  ||  post
router.post("/login",loginController);

//register || post

router.post("/register",registerController);

//Auth || post
router.post("/getUserData",authMiddleware,authController );

//Apply-doctor || post
router.post("/apply-doctor",authMiddleware,applyDoctorController );

//Notification Doctor  || post
router.post("/get-all-notification",authMiddleware, getAllNotificationController );

//Notification Doctor  || post
router.post("/delete-all-notification",authMiddleware, deleteAllNotificationController );

//get all doctor
router.get('/getAllDoctors',authMiddleware, getAllDoctorsController)

// BOOK Appointment

router.post('/book-appointment', authMiddleware, bookAppointmentController)

//check booking availbility
router.post('/booking-availbility',authMiddleware,bookingAvailabilityController)

//Appointments list

router.get("/user-appointments",authMiddleware, userAppointmentsController)


module.exports=router;