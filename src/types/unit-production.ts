import { BuildingLevel } from "./building_level";

interface BaseUnitProduction {
    reduction_percent: number;
    military_building_name: string;
    building_level_id: number;
}

export interface UnitProduction extends BaseUnitProduction {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type UnitProductionList = UnitProduction[];

export interface UnitProductionListWithLevel extends UnitProduction {
    building_level: BuildingLevel;
}

export interface UpdateStorageBuilding extends Omit<BaseUnitProduction, 'military_building_name' | 'building_level_id'> {}
