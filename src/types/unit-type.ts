export type UnitType = {
    type: string;
    createdAt: string;
    updatedAt: string;
}

export type UnitTypeList = UnitType[]

export type UnitTypeEditFormErrors = {
    type: string;
    general: string;
}