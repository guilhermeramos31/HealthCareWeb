"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import * as React from "react";
import {ChangeEventHandler, useEffect, useState} from "react";
import {RegisterRequest, Role, Status} from "@/api/interfaces/register";
import {login, register} from "@/api/healthService";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {inputs} from "@/app/auth/register/inputs";
import LabelInput, {InputContent} from "@/components/form";
import {ButtonContent, MyButton} from "@/components/button";
import {buttons} from "@/app/auth/register/buttons";

export default function Register() {
	const [isMounted, setIsMounted] = useState(false);
	const [formValues, setFormValues] = useState<RegisterRequest>({
		username: "",
		name: "",
		email: "",
		phoneNumber: "",
		password: "",
		status: Status.ACTIVE,
		observations: "",
		role: Role.DOCTOR
	});

	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const { id, value } = event.target;

		let role: Role;

		switch (value) {
			case 'Doctor':
				role = Role.DOCTOR;
				break;
			case 'Nutritionist':
				role = Role.NUTRITIONIST;
				break;
			default:
				role = Role.DOCTOR;
				break;
		}
		setFormValues((prev) => ({
			...prev,
			[id]: value,
			role: role
		}));
	};

	const loginHandleClick = async (event: React.MouseEvent) => {
		event.preventDefault();
		await register(formValues);
		await login(formValues);
	};

	let iteratorInput = 0;
	let iteratorButton = 0;
	return (
		<div className={"flex justify-end items-center min-h-screen bg-blue-400"}>
			<Card className="w-[400px] h-[800px] pt-[5rem] m-[50px]">
				<CardHeader>
					<CardTitle className={"flex justify-center text-blue-950"}>{"Welcome to Healthcare"}</CardTitle>
				</CardHeader>
				<CardContent>
					{
						inputs.map((input) => (
							<InputContent key={iteratorInput++} className={"grid items-center my-2"}>
								<LabelInput {...input} onChange={handleInputChange}/>
							</InputContent>
						))
					}
					<Label className={"text-blue-950"}>Specialization</Label>
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select a specialization" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup onChange={handleInputChange}>
								<SelectItem value={"Doctor"}>Doctor</SelectItem>
								<SelectItem value={"Nutritionist"}>Nutritionist</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</CardContent>
				<CardFooter className="flex flex-col space-y-1.5">
					{
						buttons.map((button) => (
							<ButtonContent key={iteratorButton++} className={"w-full"}>
								<MyButton {...button} onClick={loginHandleClick}/>
							</ButtonContent>
						))
					}
				</CardFooter>
			</Card>
		</div>
	);
}
