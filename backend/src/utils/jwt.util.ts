import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-fallback-key';
const JWT_EXPIRES_IN = '1h';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
    return jwt.verify(token, JWT_SECRET);
};