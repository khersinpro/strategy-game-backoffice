interface BaseBuildingCost {
    quantity: number;
    resource_name: string;
}

export interface BuildingCost extends BaseBuildingCost {
    id: number;
    building_level_id: number;
    createdAt: string;
    updatedAt: string;
}

export type BuildingCostList = BuildingCost[];

export interface UpdateBuildingCost extends Omit<BaseBuildingCost, 'resource_name'> {}