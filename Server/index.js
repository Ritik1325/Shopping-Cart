
import dotenv from "dotenv";
dotenv.config();




import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connect from './config/Connect.js';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'









const app = express();






app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://shopping-cart-frontend-1.onrender.com",
        "https://shopping-cart-frontend-2.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes)






const PORT = process.env.PORT || 8000;


const Server = async () => {
    try {
        await connect();
        app.listen(PORT, "0.0.0.0", () => {
            console.log('Listening to the port', process.env.PORT);



        })
    } catch (error) {
        console.log("Error connecting server", error);

    }
}

Server();




