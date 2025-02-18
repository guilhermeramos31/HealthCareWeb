import {UserResponse} from "@/app/_api/response/User";

export interface LoginResponse {
    user: UserResponse,
    accessToken: string,
    refreshToken: string
}

export interface LoginRequest {
    email: string,
    password: string
}