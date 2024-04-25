export type Map = {
    id: number;
    server_name: string;
    x_area: number;
    y_area: number;
    createdAt: string;
    updatedAt: string;
}

export type MapList = Map[]

export type CreateMapFormErrors = {
    server_name: string;
    x_area: string;
    y_area: string;
    general: string;
}

export type UpdateMapFormErrors = {
    server_name?: string;
    x_area?: string;
    y_area?: string;
    general?: string;
}
