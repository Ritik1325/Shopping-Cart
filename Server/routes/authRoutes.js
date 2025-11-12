import express from  'express';
import  {registerUser, logoutUser, loginUser, verifyOtp } from '../Controllers/authControllers.js';


const router=express.Router();



router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.post('/login',loginUser)
router.post('/verifyOtp',verifyOtp)


export default router