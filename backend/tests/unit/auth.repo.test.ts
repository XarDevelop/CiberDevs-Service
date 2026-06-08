import { describe, it, expect, jest, beforeAll, beforeEach } from '@jest/globals';
import type { AuthRepo as AuthRepoType } from '../../src/Auth/repo/auth.repo.js';

const mockConfig = { passwordHash: 'test_hash' as string | undefined };

jest.unstable_mockModule('../../src/config/index.js', () => ({
    config: {
        admin: {
            get passwordHash() { return mockConfig.passwordHash; }
        }
    }
}));

let AuthRepo: typeof AuthRepoType;

beforeAll(async () => {
    const mod = await import('../../src/Auth/repo/auth.repo.js');
    AuthRepo = mod.AuthRepo;
});

describe('AuthRepo', () => {
    beforeEach(() => {
        mockConfig.passwordHash = 'test_hash';
    });

    it('should return the admin password hash from config', () => {
        mockConfig.passwordHash = 'test_hash';
        const authRepo = new AuthRepo();
        const hash = authRepo.getAdminPasswordHash();
        expect(hash).toBe('test_hash');
    });

    it('should return undefined if hash is not set', () => {
        mockConfig.passwordHash = undefined;
        const authRepo = new AuthRepo();
        const hash = authRepo.getAdminPasswordHash();
        expect(hash).toBeUndefined();
    });
});
