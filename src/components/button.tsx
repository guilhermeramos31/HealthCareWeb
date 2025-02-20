import {Button} from "@/components/ui/button";
import * as React from "react";

export enum VariantTypes {
    DEFAULT = "default",
    DESTRUCTIVE = "destructive",
    OUTLINE ="outline",
    SECONDARY = "secondary",
    GHOST = "ghost",
    LINK ="link",
}
interface ButtonComponentProps {
    text?: string,
    className?: string,
    variant: VariantTypes | null | undefined,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function ButtonComponent({className, text, variant, onClick}: ButtonComponentProps) {
    return <Button variant={variant} className={className} onClick={onClick}>{text}</Button>;
}

interface ButtonProps {
    variant?: VariantTypes;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ButtonLogin(props: ButtonProps) {
    const button = {
        variant: VariantTypes.DEFAULT,
        className: "p-5 w-full bg-blue-900 hover:bg-blue-950 m-2",
        text: "Login",
        onClick: props.onClick,
    };

    return (<ButtonComponent variant={button.variant} className={button.className} text={button.text} onClick={button.onClick}/>);
}

export function ButtonRegister(props: ButtonProps) {
    const button = {
        variant: VariantTypes.OUTLINE,
        className: "p-5 w-full text-blue-900 hover:text-blue-950 m-2",
        text: "Register",
        onClick: props.onClick,
    };
    if (props.variant != undefined) {
        button.variant = props.variant;
        button.className = "p-5 w-full bg-blue-900 hover:bg-blue-950 m-2";
    }

    return (<ButtonComponent variant={button.variant} className={button.className} text={button.text} onClick={button.onClick}/>);
}