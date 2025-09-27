import jwt from 'jsonwebtoken'
import User from '../models/Usermodel.js';



const isLoggedIn=async (req,res,next)=>{
    try {
        const token=req.cookies.token;

        if(!token) return res.status(404).json({message:"Login first"});

        const decoded= jwt.verify(token,process.env.SECRET_KEY);

        req.user=await User.findById(decoded.id).select("-password");

        next();

        
    } catch (error) {
        return res.status(500).json({message:"Login first"});

        
    }

}

export default isLoggedIn;