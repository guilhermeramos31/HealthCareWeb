import api from "@/api/healthCareApi";
import {LoginRequest} from "@/api/interfaces/login";
import {setCookie} from "cookies-next";
import {RegisterRequest} from "@/api/interfaces/register";

export async function login({email, password}:LoginRequest){
    try {
        const response = await api.post("/Auth/Login",{
            "email": email,
            "password": password
        });
        if (response.data) {
            sessionStorage.setItem("accessToken", response.data.accessToken);

            setCookie("refresh_token", response.data.refreshToken, {
                maxAge: 60 * 60 * 24,
                path: "/",
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                httpOnly: true,
            });
        }

        return response.data;
    }catch(error){
        return Promise.reject(error);
    }
}

export async function register({email,password,status,phoneNumber,role,name,username,observations}:RegisterRequest){
    try{
        const response = await api.post("/Employee/Register",{
            "username": username,
            "email": email,
            "password": password,
            "status": status,
            "phoneNumber": phoneNumber,
            "role": role,
            "name": name,
            "observations":observations
        });

        return response.data;
    }catch(error){
        return Promise.reject(error);
    }
}