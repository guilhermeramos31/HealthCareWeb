"use client";

import {ChangeEventHandler, useEffect, useState} from "react";
import * as React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {login} from "@/api/healthService";
import {useRouter} from "next/navigation";
import {LoginRequest} from "@/api/interfaces/login";
import {inputs} from "@/app/auth/login/inputs";
import LabelInput, { InputContent} from "@/components/form";
import {buttons} from "@/app/auth/login/buttons";
import {ButtonContent, MyButton} from "@/components/button";

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

	const buttonTypeVerify = (text: string) => {
		let onClick;

		switch (text){
			case "Login": {
				onClick = loginHandleClick;
				break;
			}
			case "Register": {
				onClick = registerHandleClick;
				break;
			}
		}

		return onClick;
	};

	let iteratorInput = 0;
	let iteratorButton = 0;
	return  (
		<div className="flex justify-end items-center min-h-screen bg-blue-400">
			<Card className="w-[400px] h-[800px] pt-[5rem] m-[50px]">
				<CardHeader>
					<CardTitle className={"flex justify-center text-blue-950"}>{"Welcome to Healthcare"}</CardTitle>
				</CardHeader>
				<CardContent>
					{
						inputs.map((input)=>(
							<InputContent key={iteratorInput++} className={"grid items-center my-2"}>
								<LabelInput {...input} onChange={handleInputChange}/>
							</InputContent>
						))
					}
				</CardContent>
				<CardFooter className="flex flex-col space-y-1.5">
					{
						buttons.map((button)=>(
							<ButtonContent key={iteratorButton++} className={"w-full"}>
								<MyButton {...button} onClick={buttonTypeVerify(button.text)} />
							</ButtonContent>
						))
					}
				</CardFooter>
			</Card>
		</div>);
}
