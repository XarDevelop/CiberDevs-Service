import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
    return jwt.verify(token, config.jwt.secret);
};
