export interface ISecurityService {
  changePassword(_body: ChangePasswordBody, _userId: string): Promise<void>;
}

export interface ChangePasswordBody {
    password: string;
    newPassword: string;
}