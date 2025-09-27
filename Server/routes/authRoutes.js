import express from  'express';
import  {registerUser, logoutUser, loginUser } from '../Controllers/authControllers.js';


const router=express.Router();



router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.post('/login',loginUser)


export default router