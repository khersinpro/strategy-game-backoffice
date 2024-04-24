export type Resource = {
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type ResourceList = Resource[]

export type ResourceEditFormErrors = {
    name: string;
    general: string;
}