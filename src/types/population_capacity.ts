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
export interface PopulationCapaticyWithLevel extends PopulationCapacity {
    building_level: BuildingLevel;
}

export type PopulationCapacityList = PopulationCapacity[];

export type PopulationCapacityListWithLevel = PopulationCapaticyWithLevel[];

export interface UpdatePopulationCapacity extends Omit<BasePopulationCapacity, 'town_all_building_name' | 'capacity'> {}
