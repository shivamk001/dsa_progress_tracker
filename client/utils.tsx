export interface User{
    id: string;
    email: string;
}

export interface Option{
    name: string;
    count: number;
    _id: string;
}

export interface Poll{
    name: string;
    _id: string;
    options: [Option];
}

export enum METHOD{
    POST='POST',
    GET='GET'
}