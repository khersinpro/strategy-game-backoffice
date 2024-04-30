interface UnitBase {
    name: string;
    attack: number;
    carrying_capacity: number;
    movement_speed: number;
    population_cost: number;
    training_time: number;
    unit_type: string;
    civilization_name: string;
    military_building: string;
}

export interface Unit extends UnitBase {
    createdAt: string;
    updatedAt: string;
}

export type UnitList = Unit[]

export type createUnitData = UnitBase

export type UpdateUnitData = Partial<UnitBase>

export type UnitListResponse = {
    rows: UnitList;
    count: number;
}