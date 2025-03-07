"use client";

import { PageContent } from "@/components/page";
import {Eye, Filter, Plus, Search} from "lucide-react";
import { MyButton } from "@/components/button";
import { Card } from "@/components/ui/card";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {PatientResponse} from "@/api/interfaces/patient";
import {patients, searchPatient} from "@/api/healthService";
import {AddPatientModal} from "@/app/my-work/patients/new-patient";

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [patientArray, setPatientArray] = useState<PatientResponse[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getPatients = async () => {
            try {
                let data: PatientResponse[] = [];

                if (searchTerm) {
                    const patient = await searchPatient(searchTerm);
                    if (patient) {
                        data = patient ?? [];
                    }
                } else {
                    const patientsPagination = await patients();
                    if (patientsPagination) {
                        data = patientsPagination?.patients ?? [];
                    }
                }

                setPatientArray(data);
            } catch (error) {
                console.error("Error searching for patients:", error);
            }
        };
        getPatients();

        setIsMounted(true);
    }, [searchTerm]);
    if (!isMounted) return null;

    return (
        <PageContent className="flex flex-col items-center ml-auto mr-auto w-6/12 p-6">
            <div className="flex w-full items-center justify-between mb-4">
                <h2 className="text-3xl text-white font-bold tracking-tight">Patients</h2>
                <MyButton
                    onClick={() => setIsModalOpen(true)}
                    variant="default"
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-blue-900/90"
                    text="New Patient"
                >
                    <Plus className="h-4 w-4" />
                </MyButton>
            </div>
            <Card className="w-full p-4">
                <div className="flex flex-grow gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search for patients..."
                            className="w-full rounded-lg border bg-background pl-8 pr-4 py-2 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant={"default"} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium bg-white text-black hover:bg-blue-900/90 hover:text-white self-start">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </Card>
            <Card className="w-full p-4 mt-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Name</TableHead>
                            <TableHead>CNS</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead className={"text-right"}>ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patientArray.map(patient => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">{patient.name}</TableCell>
                                <TableCell>{patient.cns}</TableCell>
                                <TableCell>{patient.cpf}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={"bg-blue-600/90 text-white hover:bg-blue-900/90 hover:text-white"}
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <AddPatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </PageContent>
    );
}
