import jwt from 'jsonwebtoken';

export const generateToken = (userid) => {
    return jwt.sign({ id: userid }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};