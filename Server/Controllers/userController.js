import User from "../models/Usermodel.js"




export const addToCart = async (req, res) => {
    try {
        const { id, type } = req.params;
        const user = await User.findById(req.user._id || req.user.id);

        if (!user) return res.status(404).json({ message: "User Not Found" });

        const existingItem = user.cart.find(item => item.product.toString() === id);

        if (existingItem) {
            if (type === "inc") {
                existingItem.count += 1;
            } else if (type === "dec" && existingItem.count > 1) {
                existingItem.count -= 1;
            } else {
                user.cart = user.cart.filter(item => item.product.toString() !== id);
            }

        } else {
            user.cart.push({ product: id, count: 1 })
        }

        await user.save();

        const populatedUser = await User.findById(user._id).populate('cart.product', 'name price image discount');

        return res.status(200).json({ cart: populatedUser.cart });

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id || req.user.id)

        if (!user) return res.status(402).json({ message: "User Not found" });

        const populatedUser = await User.findById(user._id).populate('cart.product', 'name price image discount');



        return res.status(200).json({ cart: populatedUser.cart });


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}

export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user._id || req.user.id)

        if (!user) return res.status(404).json({ message: "User Not Found" });


        user.cart = user.cart.filter(item => item._id.toString() !== id);
        await user.save();

        const populatedUser = await User.findById(user._id).populate('cart.product', 'name price image discount');
        return res.status(200).json({ cart: populatedUser.cart });


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id || req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ User: user });

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


export const Order = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findById(req.user?._id || req.user?.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const existingOrder = user.orders.some(item => item.product._id.toString() === id);

        if (existingOrder) return res.status(402).json({ message: "Already Ordered!" });
        const matchedCart=user.cart.find(item=>item.product._id.toString()===id);
        const Count=matchedCart.count;

        user.orders.push({product:id,count:Count});
        await user.save();

        const populatedUser = await User.findById(user._id).populate('orders.product', 'name price image discount');
        return res.status(200).json({ Orders: populatedUser.orders, message: "Order Confirmed!", });



    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


export const getOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id || req.user?.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const populatedUser = await User.findById(user._id).populate('orders.product', 'name price image discount');
        return res.status(200).json({ Orders: populatedUser.orders });



    } catch (error) {
        return res.status(500).json({ message: error.message });


    }

}

export const removeOrders = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user?._id || req.user?.id);

        if (!user) return res.status(404).json({ message: "User not Found" });

        user.orders = user.orders.filter(item => item.product._id.toString() !== id);
        await user.save();

        const populatedUser = await User.findById(user._id).populate('orders.product', 'name price image discount');
        return res.status(200).json({ Orders: populatedUser.orders, message: "Order Cancelled!" });


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}



