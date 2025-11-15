import jwt from 'jsonwebtoken'
import User from "../models/Usermodel.js";
import bcrypt from 'bcrypt'
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);



export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) return res.status(403).json({ message: "Already Registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);


        const user = await User.create({
            name,
            password: hashedPassword,
            email,
            role,
            otp,
            otpExpiry
        })


        if (email === "ritikrajput2550@gmail.com") {
            await resend.emails.send({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Your OTP Code",
                html: `
             <h2>Your Verification Code</h2>
               <p>Your OTP is <b>${otp}</b></p>
              <p>This OTP expires in 5 minutes.</p> `
            });

            return res.status(200).json({ message: "OTP sent to your email. Please verify." });


        }



        return res.status(200).json({ otp });




    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });


    }

}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

        if (user.otpExpiry < Date.now()) return res.status(400).json({ message: "OTP expired" });


        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        res.status(200).json({ user, message: "OTP Verified successfully!" });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

}



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });


        if (!user) return res.status(401).json({ message: "invalid email or password" });

        const pass = await bcrypt.compare(password, user.password);

        if (!pass) return res.status(401).json({ message: "invalid email or password" })

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        if (email === "ritikrajput2550@gmail.com") {
            await resend.emails.send({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Your OTP Code",
                html: `
                      <h2>Your Verification Code</h2>
                      <p>Your OTP is <b>${otp}</b></p>
                     <p>This OTP expires in 5 minutes.</p> `
            });

            return res.status(200).json({ message: "OTP sent to your email. Please verify." });

        }





        return res.status(200).json({otp });



    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });

    }
}


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        return res.status(200).json({ message: "Logged Out", user: null });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });

    }
}
