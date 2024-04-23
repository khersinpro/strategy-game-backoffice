export type Civilization = {
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type CivilizationList = Civilization[]

export type CivilizationEditFormErrors = {
    name: string;
    general: string;
}