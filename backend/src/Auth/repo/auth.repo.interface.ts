export interface IAuthRepo {
    getAdminPasswordHash(): string | undefined;
}