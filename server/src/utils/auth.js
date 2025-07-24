import jwt from 'jsonwebtoken'

import env from '../config/env.js';

const JWT_SECRET = env.JWT_SECRET || "your_super_secret_key";
const JWT_EXPIRES_IN = "1d";

export function generateToken(user) {
	return jwt.sign(
		{
			id: user._id,
			email: user.email
		},
		JWT_SECRET,
		{
			expiresIn: JWT_EXPIRES_IN
		}
	);
}
