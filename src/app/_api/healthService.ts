import api from "@/app/_api/healthCareApi";
import {LoginRequest} from "@/app/_api/response/Login";
import {setCookie} from "cookies-next";

export async function login({email, password}:LoginRequest){
    try {
        const response = await api.post("/Auth/Login",{
            'email': email,
            'password': password
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