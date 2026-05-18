import { type IAuthRepo } from './auth.repo.interface.js';

export class AuthRepo implements IAuthRepo {
    getAdminPasswordHash(): string | undefined {
    // Retorna el hash almacenado en las variables de entorno
        return process.env.ADMIN_PASSWORD_HASH;
    }
}