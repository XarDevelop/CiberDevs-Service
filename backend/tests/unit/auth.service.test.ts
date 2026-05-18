import { AuthService } from '../../src/Auth/services/auth.service.js';
import type { IAuthRepo } from '../../src/Auth/repo/auth.repo.interface.js';
import bcrypt from 'bcrypt';
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';

// No necesitamos mockear jwt.util, podemos dejar que genere un token real
import * as jwtUtil from '../../src/utils/jwt.util.js';

describe('AuthService', () => {
    let authRepoMock: jest.Mocked<IAuthRepo>;
    let authService: AuthService;

    beforeEach(() => {
        authRepoMock = {
            getAdminPasswordHash: jest.fn()
        };

        authService = new AuthService(authRepoMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if ADMIN_PASSWORD_HASH is not set', async () => {
        authRepoMock.getAdminPasswordHash.mockReturnValue(undefined);

        await expect(authService.loginAndGetToken('any')).rejects.toThrow(
            'Server configuration error: ADMIN_PASSWORD_HASH is missing in .env'
        );
    });

    it('should return null if password does not match hash', async () => {
        authRepoMock.getAdminPasswordHash.mockReturnValue('hashed_password');
        jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

        const token = await authService.loginAndGetToken('wrong_password');

        expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', 'hashed_password');
        expect(token).toBeNull();
    });

    it('should return a token if password matches', async () => {
        authRepoMock.getAdminPasswordHash.mockReturnValue('hashed_password');
        jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

        const token = await authService.loginAndGetToken('correct_password');

        expect(bcrypt.compare).toHaveBeenCalledWith('correct_password', 'hashed_password');
        expect(typeof token).toBe('string');
        expect(token?.split('.').length).toBe(3); // Un JWT standard tiene 3 partes
    });
});