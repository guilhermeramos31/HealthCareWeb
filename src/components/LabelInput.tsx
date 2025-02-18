import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


export interface FormInputProps {
    id: string,
    text: string,
    type?: string,
    htmlFor: string,
    placeholder: string,
    classNameInput?: string,
    autoComplete?: string,
}

export default function LabelInput({id, text, type, htmlFor, classNameInput, placeholder}: FormInputProps) {
    return (
        <div className={classNameInput}>
            <Label htmlFor={htmlFor}>{text}</Label>
             <Input id={id} name={text} placeholder={placeholder} type={type} />
        </div>
    );
}