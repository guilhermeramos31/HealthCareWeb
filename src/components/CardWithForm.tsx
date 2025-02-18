"use client";

import * as React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import FormLogin from "@/components/FormLogin";
import ButtonGroup from "@/components/ButtonGroup";
import {VariantTypes} from "@/components/Button";
import {useEffect, useState} from "react";

export function CardWithForm() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;


    const cardTitle = {
        className: "flex justify-center text-blue-950",
        text: "Welcome to Healthcare"
    };

    const form = {
        className: "grid w-full items-center gap-4",
        formInputs: [{
            id:"email",
            type: "email",
            text : "Email",
            htmlFor : "email",
            placeholder : "exemple@exemple.com",
            classNameInput :"flex flex-col space-y-1.5 text-blue-950"
        }, {
            id:"password",
            type: "password",
            text : "Password",
            htmlFor : "password",
            placeholder : "SecurityPass@123",
            classNameInput :"flex flex-col space-y-1.5 text-blue-950"
        }]
    };


    const buttons = [
        {
            variant: VariantTypes.DEFAULT,
            className: "p-5 w-full bg-blue-900 hover:bg-blue-950",
            text: "Login"
        },
        {
            variant: VariantTypes.OUTLINE,
            className: "p-5 w-full text-blue-900 hover:text-blue-950",
            text: "Register",
        }
    ];

    return (
        <Card className="w-[400px] h-[800px] pt-[5rem] m-[50px]">
            <CardHeader>
                <CardTitle className={cardTitle.className}>{cardTitle.text}</CardTitle>
            </CardHeader>
            <CardContent>
                <FormLogin className={form.className} formInputs={form.formInputs} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-1.5">
                <ButtonGroup buttons={buttons} />
            </CardFooter>
        </Card>
    );
}
