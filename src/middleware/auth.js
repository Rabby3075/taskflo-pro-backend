import jwt from 'jsonwebtoken';
import User from '../models/Users.js';


export const protect = async (req, res, next) => {
    try{
        let token;
        //check for token in header
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];  //get token from header
            
        }
        //if token not found
        if(!token){
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        try{
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user from token
            req.user = await User.findById(decoded.id).select('-password');
            //if still no user
            if(!req.user){
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            next();
        }catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
};