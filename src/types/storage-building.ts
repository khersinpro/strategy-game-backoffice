interface BaseStorageBuilding {
    name: string;
    resource_name: string; 
}

export interface StorageBuilding extends BaseStorageBuilding {
    createdAt: string;
    updatedAt: string;
}

export type StorageBuildingList = StorageBuilding[];

export interface CreateStorageBuilding extends BaseStorageBuilding {}

export interface UpdateStorageBuilding extends Partial<BaseStorageBuilding> {}

