"use client";
import LabelInput , { FormInputProps } from "@/components/LabelInput";
import { useEffect, useState } from "react";

export interface FormLoginProps {
    className?: string;
    formInputs?: FormInputProps[];
}

export default function FormLogin({ className, formInputs = [] }: FormLoginProps) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;

    return (
        <div>
            <form>
                <div className={className}>
                    {formInputs.map((input, index) => (
                        <LabelInput
                            key={input.id || index}
                            id={input.id}
                            htmlFor={input.htmlFor}
                            text={input.text}
                            classNameInput={input.classNameInput}
                            placeholder={input.placeholder}
                        />
                    ))}
                </div>
            </form>
        </div>
    );
}
