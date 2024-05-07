import { BuildingLevel } from "./building_level";

interface BaseStorageCapacity {
    capacity: number;
    storage_building_name: string;
    building_level_id: number;
}

export interface StorageCapacity extends BaseStorageCapacity {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type StorageCapacityList = StorageCapacity[];

export interface StorageCapacityListWithLevel extends StorageCapacity {
    building_level: BuildingLevel;
}

export interface UpdateStorageCapacity extends Omit<BaseStorageCapacity, 'storage_building_name' | 'building_level_id'> {}
