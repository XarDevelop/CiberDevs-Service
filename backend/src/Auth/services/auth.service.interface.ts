export interface IAuthService {
    loginAndGetToken(password: string): Promise<string | null>;
}