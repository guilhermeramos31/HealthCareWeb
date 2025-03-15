"use client";

import {PageContent} from "@/components/page";
import {Eye, Filter, Plus} from "lucide-react";
import {MyButton} from "@/components/button";
import {Card} from "@/components/ui/card";
import React, {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {PatientResponse} from "@/api/interfaces/patient";
import {patients} from "@/api/healthService";
import {AddPatientModal} from "@/app/my-work/patients/new-patient";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useMounted} from "@/hooks/useMounted";
import {FilterComponent} from "@/app/my-work/patients/filterComponent";

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const mounted = useMounted();
    const [patientArray, setPatientArray] = useState<PatientResponse[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getPatients = useCallback(async () => {
        try {
            let data: PatientResponse[] = [];
            const patientsPagination = await patients(page.toString(),"10",searchTerm);
            if (patientsPagination) {
                data = patientsPagination ?? [];
            }

            setPatientArray(data);
        } catch (error) {
            console.error("Error searching for patients:", error);
        }
    },[searchTerm, page]);

    useEffect(() => {
        getPatients().then();

        const pageHeader = Number.parseInt(sessionStorage.getItem("total_page")??"1");
        setTotalPage(Math.ceil(pageHeader / 10));

    },[searchTerm, page, getPatients]);

    if (!mounted) return null;

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
                    <FilterComponent setSearch={setSearchTerm} />
                    <Button variant={"default"} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium bg-white text-black hover:bg-blue-900/90 hover:text-white self-start">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </Card>
            <Card className="w-full min-h-[560px] h-auto p-4 mt-5">
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
                                        <Link className={"grid grid-cols-2 gap-1"} href={`/my-work/patients/${patient.id}`}>
                                            <Eye className="mr-2 h-4 w-4" /> View
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <Card className={"mt-5"}>
                <Pagination className={"cursor-pointer select-none"}>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setPage(page <= 1 ? 1 : page -1)} />
                        </PaginationItem>
                        {Array.from({ length: 3 }, (_, i) => {
                            return Math.max(1, Math.min(page - 1, totalPage - 2)) + i;
                        }).map((pageNumber) =>
                                pageNumber <= totalPage && (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            onClick={() => setPage(pageNumber)}
                                            isActive={pageNumber === page}>
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                        )}
                        <PaginationItem>
                            <PaginationNext onClick={() => { if (page < totalPage) setPage(page + 1);}}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>
            <AddPatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </PageContent>
    );
}

