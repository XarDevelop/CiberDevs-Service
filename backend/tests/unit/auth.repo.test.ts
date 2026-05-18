import { AuthRepo } from '../../src/Auth/repo/auth.repo.js';
import { describe, it, expect, jest, beforeEach, afterAll } from '@jest/globals';

describe('AuthRepo', () => {
    let authRepo: AuthRepo;
    const ORIGINAL_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...ORIGINAL_ENV };
        authRepo = new AuthRepo();
    });

    afterAll(() => {
        process.env = ORIGINAL_ENV;
    });

    it('should return the admin password hash from env', () => {
        process.env.ADMIN_PASSWORD_HASH = 'test_hash';
        const hash = authRepo.getAdminPasswordHash();
        expect(hash).toBe('test_hash');
    });

    it('should return undefined if the env variable is not set', () => {
        delete process.env.ADMIN_PASSWORD_HASH;
        const hash = authRepo.getAdminPasswordHash();
        expect(hash).toBeUndefined();
    });
});
