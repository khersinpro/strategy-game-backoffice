interface BaseMilitaryBuilding {
    name: string;
    unit_type: string; 
}

export interface MilitaryBuilding extends BaseMilitaryBuilding {
    createdAt: string;
    updatedAt: string;
}

export type MilitaryBuildingList = MilitaryBuilding[];

export interface CreateMilitaryBuilding extends BaseMilitaryBuilding {}

export interface UpdateMilitaryBuilding extends Partial<BaseMilitaryBuilding> {}
