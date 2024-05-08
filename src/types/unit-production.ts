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

export interface UnitProductionWithLevel extends UnitProduction {
    building_level: BuildingLevel;
}

export type UnitProductionList = UnitProduction[];

export type UnitProductionListWithLevel = UnitProductionWithLevel[];

export interface UpdateUnitProduction extends Omit<BaseUnitProduction, 'military_building_name' | 'building_level_id'> {}
