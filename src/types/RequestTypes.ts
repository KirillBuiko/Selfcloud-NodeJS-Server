import ResultCode from "@/ResultCode";

export interface ResultObject<K>{
    code: ResultCode,
    result?: K
}

export interface AccessData{
    access: string,
    fingerprint: string
}

export interface RefreshData extends AccessData{
    refresh: string
}

export interface LoginData{
    login: string,
    password: string,
    fingerprint?: string
}

export interface RegData{
    email: string,
    phone: string,
    password: string,
    name?: string,
    surname?: string,
}
