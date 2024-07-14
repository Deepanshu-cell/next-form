const User = require("../models/User");


const signupUser = async (req, res) => {
    try {
        const { firstName, email, lastName, phone, password } = req?.body;
        // check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) res.status(409).json({ message: 'user already exists' });

        // create user
        await User.create({ firstName, lastName, email, phone, password });
    } catch (error) {
        console.log(error.message,'error occured!!');
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

module.exports = {
    signupUser
}