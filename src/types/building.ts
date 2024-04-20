export type Building = {
    name: string;
    type: string;
    is_common: boolean;
    createdAt: string;
    updatedAt: string;
}

export type BuildingList = Building[]

export type BuildingListResponse = {
    rows: BuildingList;
    count: number;
}