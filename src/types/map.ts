interface MapBase {
    server_name: string;
    x_area: number;
    y_area: number;
}

export type CreateMapData = MapBase;

export type UpdateMapData = Partial<MapBase>;

export interface Map extends MapBase {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type MapList = Map[]

export interface CreateMapFormErrors extends Partial<MapBase> {
    general?: string;
}

export type UpdateMapFormErrors = CreateMapFormErrors;
