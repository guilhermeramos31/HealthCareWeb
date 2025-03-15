import api from "@/api/healthCareApi";
import {LoginRequest} from "@/api/interfaces/login";
import {setCookie} from "cookies-next";
import {RegisterRequest} from "@/api/interfaces/register";
import {PatientRequest} from "@/api/interfaces/patient";

export async function login({email, password}:LoginRequest){
    try {
        const response = await api.post("/Auth/Login",{
            "email": email,
            "password": password
        });
        if (response.data) {
            if (sessionStorage.length > 0){
                sessionStorage.clear();
            }
            console.log(response.data.accessToken);
            sessionStorage.setItem("access_token", response.data.accessToken);
            sessionStorage.setItem("user_name", response.data.employee.name);
            sessionStorage.setItem("user_email", response.data.employee.email);

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

export async function register({email,password,status,phoneNumber,role,name,username,observations}:RegisterRequest) {
    try {
        const response = await api.post("/Employee/Register", {
            "username": username,
            "email": email,
            "password": password,
            "status": status,
            "phoneNumber": phoneNumber,
            "role": role,
            "name": name,
            "observations": observations
        });

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function searchPatient(search: string){
    try {
        const response = await api.get(`/Patient/${search}`,{
            headers: {
                Authorization: `${"Bearer ".concat(sessionStorage.getItem("access_token") ?? "")}`,
            },
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function patients(pageNumber: string ="1", pageSize: string = "10", search?: string){
    try {
        const params = new URLSearchParams({
            pageNumber: pageNumber,
            pageSize: pageSize,
        });

        if (search) {
            params.append("search", search);
        }
        const response = await api.get(`/Patient/All?${params}`);
        console.log(response.headers);
        sessionStorage.setItem("total_page", response.headers["x-total-count"] || "0");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createPatient( {name, cpf, rg, cns, dateOfBirth, nationality, maritalStatus, address}: PatientRequest ){
    try {
        const response = await api.post('/Patient/Create',{
            "Name": name,
            "Cpf": cpf,
            "Cns": cns,
            "Rg": rg,
            "Address": {
                "Street": address.street,
                "City": address.city,
                "State": address.state,
                "Complement": address.complement,
                "ZipCode": address.zipcode,
                "Neighborhood": address.neighborhood,
                "Landmark": address.landmark,
                "AddressType": address.addressType,
                "Number": address.number
            },
            "DateOfBirth": dateOfBirth,
            "Nationality": nationality,
            "MaritalStatus": maritalStatus
        },{
            headers: {
                Authorization: `${"Bearer ".concat(sessionStorage.getItem("access_token") ?? "")}`,
            },
        });

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}