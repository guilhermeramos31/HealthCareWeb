import * as React from "react";
import {ChangeEventHandler, ComponentProps} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


const style = {
    classNameLabelInput: "flex items-center relative",
    classNameInput: "flex flex-col space-y-1.5 text-blue-950 w-full"
};

interface InputContentProps extends ComponentProps<"div">{
    error?: boolean,
}

export function InputContent({error = false, ...props}: InputContentProps) {
    return (<div data-error={error} className={props.className} {...props}/>);
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

function LabelInput({id, text, type, htmlFor, classNameInput, placeholder, onChange, children}: FormInputProps) {
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

interface InputProps {
    onChange?: ChangeEventHandler<HTMLInputElement>,
    children?: React.ReactNode,
}

export function InputEmail( prop: InputProps){
    const input = {
        id:"email",
        type: "email",
        text : "Email",
        htmlFor : "email",
        placeholder : "exemple@exemple.com",
        onChange: prop.onChange,
    };

    return(
        <LabelInput
            key={input.id}
            id={input.id}
            htmlFor={input.htmlFor}
            text={input.text}
            classNameInput={style.classNameInput}
            placeholder={input.placeholder}
            onChange={input.onChange}>
            {prop.children}
        </LabelInput>
    );
}

export function InputPassword(prop: InputProps) {
    const input = {
        id:"password",
        type: "password",
        text : "Password",
        htmlFor : "password",
        placeholder : "SecurityPass@123",
        onChange: prop.onChange,
    };

    return (
        <LabelInput
            key={input.id}
            id={input.id}
            htmlFor={input.htmlFor}
            text={input.text}
            classNameInput={style.classNameInput}
            placeholder={input.placeholder}
            onChange={input.onChange}
        >
            {prop.children}
        </LabelInput>
    );
}

export function InputUsername( prop: InputProps){
    const input = {
        id:"username",
        type: "username",
        text : "Username",
        htmlFor : "username",
        placeholder : "exemple123",
        onChange: prop.onChange,
    };

    return(
        <LabelInput
            key={input.id}
            id={input.id}
            htmlFor={input.htmlFor}
            text={input.text}
            classNameInput={style.classNameInput}
            placeholder={input.placeholder}
            onChange={input.onChange}>
            {prop.children}
        </LabelInput>
    );
}

export function InputName( prop: InputProps){
    const input = {
        id:"name",
        type: "name",
        text : "Name",
        htmlFor : "name",
        placeholder : "john doe",
        onChange: prop.onChange,
    };

    return(
        <LabelInput
            key={input.id}
            id={input.id}
            htmlFor={input.htmlFor}
            text={input.text}
            classNameInput={style.classNameInput}
            placeholder={input.placeholder}
            onChange={input.onChange}>
            {prop.children}
        </LabelInput>
    );
}

export function InputPhoneNumber( prop: InputProps){
    const input = {
        id:"phoneNumber",
        type: "phoneNumber",
        text : "PhoneNumber",
        htmlFor : "PhoneNumber",
        placeholder : "+5511999999999",
        onChange: prop.onChange,
    };

    return(
        <LabelInput
            key={input.id}
            id={input.id}
            htmlFor={input.htmlFor}
            text={input.text}
            classNameInput={style.classNameInput}
            placeholder={input.placeholder}
            onChange={input.onChange}>
            {prop.children}
        </LabelInput>
    );
}