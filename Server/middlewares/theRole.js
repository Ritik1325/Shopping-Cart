
const theRole = (allowedRole) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user?.role;

            if (!userRole) return res.status(401).json({message:"role not defined"});

            return userRole.toLowerCase() === allowedRole.toLowerCase() ? next()
                : res.status(400).json({message:"Not Authorized"});
        } catch (error) {
            return res.status(500).send({message:error.message});

        }
    }

}

export default theRole;