import { config } from '../../config/index.js';
import { type IAuthRepo } from './auth.repo.interface.js';

export class AuthRepo implements IAuthRepo {
    getAdminPasswordHash(): string | undefined {
        return config.admin.passwordHash;
    }
}
