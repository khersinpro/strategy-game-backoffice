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

export interface StorageCapacityWithLevel extends StorageCapacity {
    building_level: BuildingLevel;
}

export type StorageCapacityList = StorageCapacity[];

export type StorageCapacityListWithLevel = StorageCapacityWithLevel[];

export interface UpdateStorageCapacity extends Omit<BaseStorageCapacity, 'storage_building_name' | 'building_level_id'> {}
