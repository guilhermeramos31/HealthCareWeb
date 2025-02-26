import * as React from "react";
import {ChangeEventHandler} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


const style = {
    classNameLabelInput: "flex items-center relative",
    classNameInput: "flex flex-col space-y-1.5 text-blue-950 w-full"
};

export function InputContent({...props}) {
    return (<div className={props.className} {...props}/>);
}

interface FormInputProps {
    id: string,
    text: string,
    type?: string,
    htmlFor: string,
    placeholder: string,
    autoComplete?: string,
    classNameInput?: string,
    children?: React.ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function LabelInput({id, text, type, htmlFor, classNameInput, placeholder, onChange, children}: FormInputProps) {
    return (
        <InputContent className={classNameInput}>
            <Label htmlFor={htmlFor}>{text}</Label>
            <InputContent className={style.classNameLabelInput}>
                {children}
                <Input id={id} name={text} placeholder={placeholder} type={type} onChange={onChange}/>
            </InputContent>
        </InputContent>
    );
}