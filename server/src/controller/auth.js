import User from "../models/User.js";

function encrypt(rawPassword) {
    return rawPassword + "1234";
}


export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        
        if(user.password === encrypt(password)) {
            res.status(200).json({
                access_token : "123456"
            })
        }

    } catch(err) {
        res.status(500).json({ error: err.message});
    } 
}

export const signup = async (req,res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        await user.save();
        res.status(201).json(user);

    } catch(err) {
        res.status(500).json({ error: err.message});
    } 
}