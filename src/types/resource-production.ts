import { BuildingLevel } from "./building_level";

interface BaseResourceProduction {
    production: number;
    resource_building_name: string;
    building_level_id: number;
}

export interface ResourceProduction extends BaseResourceProduction {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface ResourceProductionWithLevel extends ResourceProduction {
    building_level: BuildingLevel;
}

export type ResourceProductionList = ResourceProduction[];

export type ResourceProductionListWithLevel = ResourceProductionWithLevel[];

export interface UpdateResourceProduction extends Omit<BaseResourceProduction, 'resource_building_name' | 'production'> {}
