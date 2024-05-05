import { BuildingCostList } from "./building_cost";

interface BaseBuildingLevel {
    building_name: string;
    level: number;
    time: number;
}

export interface BuildingLevel extends BaseBuildingLevel {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type BuildingLevelList = BuildingLevel[];

export interface BuildingLevelWithCost extends BuildingLevel {
    Building_costs: BuildingCostList;
}

export type BuildingLevelWithCostList = BuildingLevelWithCost[];

export interface CreateBuildingLevel extends Omit<BaseBuildingLevel, 'level'> {}

export interface UpdateBuildingLevel {
    time: number;
}