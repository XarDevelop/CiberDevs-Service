import bcrypt from 'bcrypt';
import { type IAuthRepo } from '../repo/auth.repo.interface.js';
import { type IAuthService } from './auth.service.interface.js';
import { generateToken } from '../../utils/jwt.util.js';

export class AuthService implements IAuthService {
    constructor(private authRepo: IAuthRepo) {}

    async loginAndGetToken(password: string): Promise<string | null> {
        const hash = this.authRepo.getAdminPasswordHash();
    
        if (!hash) {
            console.error('ADMIN_PASSWORD_HASH is not configured');
            return null;
        }

        const isMatch = await bcrypt.compare(password, hash);
        if (!isMatch) {
            return null;
        }

        const token = generateToken({ role: 'admin' });
        return token;
    }
}