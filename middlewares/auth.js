import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const adminGuard = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Admin access required.' });
    }
    next();
};

export { auth, adminGuard };
