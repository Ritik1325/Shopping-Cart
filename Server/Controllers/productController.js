
import Product from "../models/Productmodel.js";
import User from "../models/Usermodel.js";





export const createProduct = async (req, res) => {
    try {
        const { name, price, category, discount, bgcolor, panelcolor, textcolor } = req.body;
        const user = await User.findOne(req.user._id);

        if (!user) return res.status(401).json({ message: "Login first" });



        if (!req.file) return res.status(400).json({ message: "Image required" });

        const newProduct = await Product.create({
            name,
            price,
            discount,
            category,
            bgcolor,
            panelcolor,
            textcolor,
            image: {
                public_id: req.file.filename || req.file.public_id,
                url: req.file.path,
            },
            createdBy: req.user._id || req.user.id

        })

        user.products.push(req.user._id);
        await user.save();

        const populatedProduct = await newProduct.populate("createdBy", "name email");

        return res.status(201).json({ message: "New product created", product: populatedProduct })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products) return res.status(404).json({ message: "Error fetching products" });

        return res.status(200).json({ Products: products });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}


export const myProducts = async (req, res) => {
    try {

        const user = await User.findById(req.user._id || req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" })

        const myProducts = await Product.find({ createdBy: user._id })

        return res.status(200).json({ Products: myProducts });


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}


export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);

        return res.status(200).json({ message: "Deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const productById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);

        if (!product) return res.status(402).json({ message: "Error getting ID" });

        return res.status(200).json({ product })

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const UpdateId = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, discount, bgcolor, panelcolor, textcolor } = req.body;
        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ message: "Product Not found" });


        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;
        product.discount = discount || product.discount;
        product.bgcolor = bgcolor || product.bgcolor;
        product.panelcolor = panelcolor || product.panelcolor;
        product.textcolor = textcolor || product.textcolor;
        product.image = {
            public_id: req.file.filename || req.file.public_id,
            url: req.file.path,
        }

        await product.save();

        return res.status(200).json({ message: "Product updated successfully", product });



    } catch (error) {
        return res.status(500).json({ message: error.message });


    }
}





