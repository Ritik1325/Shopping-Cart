import express from  'express';
import isLoggedIn from '../middlewares/isLoggedIn.js'
import theRole from '../middlewares/theRole.js';
import  { addToCart,getCart, getOrders, getUser, Order, removeFromCart, removeOrders } from '../Controllers/userController.js';

const router=express.Router();


router.get('/',isLoggedIn,getUser);


router.post('/cart/:id/:type',isLoggedIn,theRole("customer"),addToCart);
router.get('/cart',isLoggedIn,theRole("customer"),getCart);
router.post('/cart/:id',isLoggedIn,theRole("customer"),removeFromCart);
router.post('/order/:id',isLoggedIn,theRole('customer'),Order);
router.get('/getOrder',isLoggedIn,theRole('customer'),getOrders);
router.post('/removeOrder/:id',isLoggedIn,theRole('customer'),removeOrders)


export default router;