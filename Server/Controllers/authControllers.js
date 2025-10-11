import jwt from 'jsonwebtoken'
import User from "../models/Usermodel.js";
import bcrypt from 'bcrypt'





export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) return res.status(403).json({ message: "Already Registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            password: hashedPassword,
            email,
            role
        })

      

        const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });



        return res.status(200).json({ user: user, message: "Registered Successfully" });




    } catch (error) {
        console.log(error.message);
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



        const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });



        return res.status(200).json({ user: user, message: "LoggedIn successfully" });



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
