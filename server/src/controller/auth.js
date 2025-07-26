import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/auth.js";


export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		res.status(200).json({
			access_token: generateToken(user)
		});
		
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export const signup = async (req,res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const userObject = user.toObject();
        delete userObject.password;


        res.status(201).json(userObject);
            } catch (err) {
        res.status(500).json({ error: err.message });
            }
}