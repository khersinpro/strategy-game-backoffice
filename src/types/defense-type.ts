interface DefenseTypeBase {
    unit_name: string;
    type: string;
    defense_value: number;
}

export interface DefenseType extends DefenseTypeBase {
    createdAt: string;
    updatedAt: string;
}

export type DefenseTypeList = DefenseType[]

export type CreateDefenseTypeData = DefenseTypeBase

export type UpdateDefenseTypeData = DefenseTypeBase