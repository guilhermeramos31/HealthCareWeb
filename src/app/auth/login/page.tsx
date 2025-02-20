"use client";

import {ChangeEventHandler, useEffect, useState} from "react";
import * as React from "react";
import {ButtonLogin, ButtonRegister} from "@/components/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {login} from "@/api/healthService";
import {InputPassword, InputEmail, InputContent} from "@/components/form";
import {useRouter} from "next/navigation";
import {LoginRequest} from "@/api/interfaces/login";

export default function Login() {
	const [isMounted, setIsMounted] = useState(false);
	const [formValues, setFormValues] = useState<LoginRequest>({
		email: "",
		password: "",
	});
	const router= useRouter();

	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const { id, value } = event.target;
		setFormValues((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const loginHandleClick = async (event: React.MouseEvent) => {
		event.preventDefault();
		await login(formValues);
	};

	const registerHandleClick = async (event: React.MouseEvent) => {
		event.preventDefault();
		router.push("/auth/register");
	};

	return  (
		<div className="flex justify-end items-center min-h-screen bg-blue-400">
			<Card className="w-[400px] h-[800px] pt-[5rem] m-[50px]">
				<CardHeader>
					<CardTitle className={"flex justify-center text-blue-950"}>{"Welcome to Healthcare"}</CardTitle>
				</CardHeader>
				<CardContent>
					<InputContent className={"grid items-center my-2"}>
						<InputEmail onChange={handleInputChange}/>
					</InputContent>
					<InputContent className={"grid items-center my-2"}>
						<InputPassword onChange={handleInputChange} />
					</InputContent>
				</CardContent>
				<CardFooter className="flex flex-col space-y-1.5">
					<ButtonLogin onClick={loginHandleClick}/>
					<ButtonRegister onClick={registerHandleClick}/>
				</CardFooter>
			</Card>
		</div>);
}
