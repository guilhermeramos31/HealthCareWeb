"use client";

import {ChangeEventHandler, useEffect, useState} from "react";
import * as React from "react";
import {ButtonLogin, ButtonRegister} from "@/components/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {login} from "@/app/_api/healthService";
import {InputPassword, InputEmail, InputContent} from "@/components/form";

export default function Login() {
	const [isMounted, setIsMounted] = useState(false);
	const [formValues, setFormValues] = useState<{email: string, password: string}>({
		email: "",
		password: "",
	});

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

	const handleClick = async (event: React.MouseEvent) => {
		event.preventDefault();
		await login(formValues);
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
					<ButtonLogin onClick={handleClick}/>
					<ButtonRegister/>
				</CardFooter>
			</Card>
		</div>);
}
