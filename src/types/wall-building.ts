interface BaseWallBuilding {
    name: string;
    civilization_name: string; 
}

export interface WallBuilding extends BaseWallBuilding {
    createdAt: string;
    updatedAt: string;
}

export type WallBuildingList = WallBuilding[];

export interface CreateWallBuilding extends BaseWallBuilding {}

export interface UpdateWallBuilding extends Partial<BaseWallBuilding> {}

