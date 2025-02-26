import {UserResponse} from "@/api/interfaces/user";

export interface LoginResponse {
    user: UserResponse,
    accessToken: string,
    refreshToken: string
}

export interface LoginRequest {
    email: string,
    password: string
}