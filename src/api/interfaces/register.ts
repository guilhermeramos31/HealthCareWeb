import {LRUCache} from "lru-cache";

export enum Status {
    ACTIVE= "ACTIVE",
    DISABLED = "DISABLED",
}

export enum Role{
    DOCTOR = 1,
    NUTRITIONIST = 2
}

export interface RegisterRequest {
    username: string,
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    status: Status,
    observations: string,
    role: Role
}