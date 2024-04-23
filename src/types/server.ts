export type Server = {
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type ServerList = Server[]

export type ServerEditFormErrors = {
    name: string;
    general: string;
}