export interface ISecurityService {
  changePassword(body: ChangePasswordBody, userId: string): Promise<void>;
}

export interface ChangePasswordBody {
    password: string;
    newPassword: string;
}