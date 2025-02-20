"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {InputContent, InputEmail, InputName, InputPassword, InputPhoneNumber, InputUsername} from "@/components/form";
import {ButtonRegister, VariantTypes} from "@/components/button";
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

	return (
		<div className={"flex justify-end items-center min-h-screen bg-blue-400"}>
			<Card className="w-[400px] h-[800px] pt-[5rem] m-[50px]">
				<CardHeader>
					<CardTitle className={"flex justify-center text-blue-950"}>{"Welcome to Healthcare"}</CardTitle>
				</CardHeader>
				<CardContent>
					<InputContent className={"grid items-center my-2"}>
						<InputUsername onChange={handleInputChange}/>
					</InputContent>
					<InputContent className={"grid items-center my-2"}>
						<InputName onChange={handleInputChange}/>
					</InputContent>
					<InputContent className={"grid items-center my-2"}>
						<InputEmail onChange={handleInputChange}/>
					</InputContent>
					<InputContent className={"grid items-center my-2"}>
						<InputPhoneNumber onChange={handleInputChange}/>
					</InputContent>
					<InputContent className={"grid items-center my-2"}>
						<InputPassword onChange={handleInputChange}/>
					</InputContent>
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
					<ButtonRegister variant={VariantTypes.DEFAULT} onClick={loginHandleClick}/>
				</CardFooter>
			</Card>
		</div>
	);
}
