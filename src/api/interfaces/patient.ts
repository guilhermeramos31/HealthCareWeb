 interface Address{
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipcode: string,
    landmark: string,
    addressType: string,
}

export interface PatientResponse{
    id: string,
    name: string,
    cns: string,
    cpf: string,
    nationality: string,
    maritalStatus: string,
    dateOfBirth: string,
    admissionDate: string,
    address: Address,
}

export interface PatientRequest{
    name: string,
    cns: string,
    cpf: string,
    rg: string,
    nationality: string,
    maritalStatus: string,
    dateOfBirth: string,
    address: Address,
}