import { BuildingLevel } from "./building_level";

interface BasePopulationCapacity {
    capacity: number;
    town_all_building_name: string;
    building_level_id: number;
}

export interface PopulationCapacity extends BasePopulationCapacity {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type PopulationCapacityList = PopulationCapacity[];

export interface PopulationCapacityListWithLevel extends PopulationCapacity {
    building_level: BuildingLevel;
}

export interface UpdatePopulationCapacity extends Omit<BasePopulationCapacity, 'town_all_building_name' | 'capacity'> {}
