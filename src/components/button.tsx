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

type variant = "default" | "secondary" | "ghost" | "outline" | "destructive" | "link" | null | undefined;
export interface ButtonComponentProps {
    text?: string,
    className?: string,
    variant: variant,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function ButtonContent({...props}) {
    return (<div className={props.className} {...props}/>);
}
export function MyButton({className, text, variant, onClick}: ButtonComponentProps) {
    return <Button variant={variant} className={className} onClick={onClick}>{text}</Button>;
}
