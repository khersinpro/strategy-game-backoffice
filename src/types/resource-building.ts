interface BaseResourceBuilding {
    name: string;
    resource_name: string; 
}

export interface ResourceBuilding extends BaseResourceBuilding {
    createdAt: string;
    updatedAt: string;
}

export type ResourceBuildingList = ResourceBuilding[];

export interface CreateResourceBuilding extends BaseResourceBuilding {}

export interface UpdateResourceBuilding extends Partial<BaseResourceBuilding> {}

