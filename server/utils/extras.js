import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

const isPasswordValid = (password, hashedPassword) => {
    return bcryptjs.compareSync(password, hashedPassword);
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '180d' });
}

export { hashPassword, isPasswordValid, generateToken };