import { db } from '../db/index.js';
import { usersTable } from "../db/schema.js";
import { generateToken, hashPassword, isPasswordValid } from '../utils/extras.js';
import { emailValidation } from "../utils/validations.js"
import jwt from 'jsonwebtoken';

const registerController = async(req, res) => {
    try {
        const { email, password, confirmPassword } = req.body

        if( !email || !password || !confirmPassword ) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if( !emailValidation(email) ) {
            return res.status(400).json({ message: 'Invalid email' })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        const user = await db.select().from(usersTable).where(usersTable.email.equals(email))

        if(user.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = hashPassword(password);

        await db.insert(usersTable).values({
            email,
            password: hashedPassword
        })

        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log('Error in registerController:', error);
    }
}

const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.select().from(usersTable).where(usersTable.email.equals(email))

        if(user.length === 0) {
            return res.status(400).json({ message: 'User does not exist' })
        }

        const hashedPassword = user[0].password;

        if(!isPasswordValid(password, hashedPassword)) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = generateToken({ id: user[0].id, email: user[0].email });

        return res.status(200).json({ 
            token,
            message: 'User logged in successfully'
        });
    } catch (error) {
        console.log('Error in loginController:', error);
    }
}

export {
    registerController,
    loginController
};