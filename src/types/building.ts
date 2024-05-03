interface BaseBuilding {
    name: string;
    type: string;
    is_common: boolean;
}

export interface Building extends BaseBuilding {
    createdAt: string;
    updatedAt: string;
}

export type BuildingList = Building[]

export type BuildingListResponse = {
    rows: BuildingList;
    count: number;
}

export type UpdateBuilding = {
    name: string;
}
