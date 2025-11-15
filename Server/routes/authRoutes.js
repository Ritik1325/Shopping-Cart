import express from  'express';
import  {registerUser, logoutUser, loginUser, verifyOtp, resendRegisterOtp } from '../Controllers/authControllers.js';


const router=express.Router();



router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.post('/login',loginUser)
router.post('/verifyOtp',verifyOtp)
router.post('/resendOtp',resendRegisterOtp)


export default router