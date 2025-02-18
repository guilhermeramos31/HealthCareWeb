import {AxiosResponse} from "axios";
import api from "@/app/_api/HealthCareApi";
import {LoginRequest, LoginResponse} from "@/app/_api/response/Login";

export abstract class Data{
    public login({email, password}:LoginRequest){
        return async ()=>{
            try {
                const response:AxiosResponse<{login: LoginResponse}> = await api.post("/login",{
                    'email': email,
                    'password': password
                });
                return response.data.login;
            }catch(error){
                return Promise.reject(error);
            }
        };
    }
}