"use client";

import ButtonComponent, {ButtonComponentProps} from "@/components/Button";
import {useEffect, useState} from "react";

interface ButtonGroupProps {
    buttons: ButtonComponentProps[];
}

export default function ButtonGroup({buttons}: ButtonGroupProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return (buttons.map((button, index) =>
        (<ButtonComponent variant={button.variant} className={button.className}text={button.text} key={index}/>)));
}