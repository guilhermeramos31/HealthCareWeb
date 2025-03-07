"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {createPatient} from "@/api/healthService";
import {PatientRequest} from "@/api/interfaces/patient";
import {inputDate, inputs} from "@/app/my-work/patients/inputs";
import LabelInput, {InputContent} from "@/components/form";
import {selects} from "@/app/my-work/patients/select";

type AddPatientModalProps = {
    isOpen: boolean
    onClose: () => void
}

export function AddPatientModal({ isOpen, onClose }: AddPatientModalProps) {
    const [patient, setPatient] = useState<PatientRequest>({
        name: "",
        cns: "",
        cpf: "",
        rg: "",
        nationality: "",
        maritalStatus: "",
        dateOfBirth: "",
        address: {
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            zipcode: "",
            landmark: "",
            addressType: "",
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient((prev) => ({...prev,[name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        patient.dateOfBirth = new Date(patient.dateOfBirth).toISOString();
        await createPatient(patient);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[925px]">
                <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} >
                    <div className="grid grid-cols-2 gap-4 py-4">
                        {
                            inputs.map((input) => (
                                <InputContent key={input.id} className={"grid grid-cols-1 items-center gap-1"}>
                                    <LabelInput {...input} classNameInput={"w-96"} onChange={handleInputChange}/>
                                </InputContent>
                            ))
                        }
                        <div className={"grid grid-cols-2"}>
                            <InputContent className={"grid grid-cols-1 items-center gap-1 w-44"}>
                                <LabelInput {...inputDate} onChange={handleInputChange}/>
                            </InputContent>
                            <div className="grid grid-cols-1 items-center gap-1 w-44">
                                <Label htmlFor="maritalStatus">
                                    Marital Status
                                </Label>
                                <Select onValueChange={(value) => setPatient((prev) => ({ ...prev, maritalStatus: value }))}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select marital status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            selects.map((select) => (
                                                <SelectItem key={select.status} value={select.status.toLowerCase()}>{select.status}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant={"default"} className={"bg-blue-600 hover:bg-blue-900"}>Add Patient</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
