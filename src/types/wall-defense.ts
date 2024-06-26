import { BuildingLevel } from "./building_level";

interface BaseWallDefense {
    defense_percent: number;
    wall_building_name: string;
    building_level_id: number;
}

export interface WallDefense extends BaseWallDefense {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface WallDefenseWithLevel extends WallDefense {
    building_level: BuildingLevel;
}

export type WallDefenseList = WallDefense[];

export type WallDefenseListWithLevel = WallDefenseWithLevel[];

export interface UpdateWallDefense extends Omit<BaseWallDefense, 'wall_building_name' | 'building_level_id'> {}
