import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { AuthHandler } from '../../src/Auth/handler/auth.handler.js';
import type { IAuthService } from '../../src/Auth/services/auth.service.interface.js';
import type { Request, Response } from 'express';

describe('AuthHandler', () => {
    let authServiceMock: jest.Mocked<IAuthService>;
    let authHandler: AuthHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        authServiceMock = {
            loginAndGetToken: jest.fn()
        };

        authHandler = new AuthHandler(authServiceMock);

        res = {
            status: jest.fn<any>().mockReturnThis(),
            json: jest.fn<any>(),
            cookie: jest.fn<any>()
        } as unknown as Response;
    });

    it('should return 400 if password is not provided', async () => {
        req = { body: {} };
        await authHandler.login(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Password is required' });
    });

    it('should return 401 if login fails (invalid credentials)', async () => {
        req = { body: { password: 'wrongpassword' } };
        authServiceMock.loginAndGetToken.mockResolvedValue(null);

        await authHandler.login(req as Request, res as Response);

        expect(authServiceMock.loginAndGetToken).toHaveBeenCalledWith('wrongpassword');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should set cookie and return 200 on successful login', async () => {
        req = { body: { password: 'correctpassword' } };
        authServiceMock.loginAndGetToken.mockResolvedValue('mocked_token');

        await authHandler.login(req as Request, res as Response);

        expect(authServiceMock.loginAndGetToken).toHaveBeenCalledWith('correctpassword');
        expect(res.cookie).toHaveBeenCalledWith('token', 'mocked_token', expect.any(Object));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful' });
    });

    it('should return 500 on internal service error', async () => {
        req = { body: { password: 'password' } };
        authServiceMock.loginAndGetToken.mockRejectedValue(new Error('Internal Server Error'));

        await authHandler.login(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
});
