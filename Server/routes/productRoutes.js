import express from  'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import upload from '../middlewares/multer.js';
import theRole from '../middlewares/theRole.js';
import  { createProduct,getProducts, myProducts, productById, removeProduct, UpdateId } from '../Controllers/productController.js';


const router=express.Router();


router.post('/create',isLoggedIn,theRole("admin"),upload.single("image"),createProduct);
router.get('/',getProducts);
router.get('/myproduct',isLoggedIn,theRole("admin"),myProducts);
router.post('/del/:id',isLoggedIn,theRole('admin'),removeProduct);
router.get('/:id',isLoggedIn,theRole('admin'),productById);
router.put('/update/:id',isLoggedIn,theRole('admin'),upload.single("image"),UpdateId);



export default router