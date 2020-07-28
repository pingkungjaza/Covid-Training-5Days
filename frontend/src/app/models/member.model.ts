export class Member{
    username: string;
    password: string;
    position: string;
}

export interface RegisterResponse{
    message: string;
}

export interface LoginResponse{
    message: string;
    token: string;
}