export type Unit = {
    name: string;
    attack: number;
    carrying_capacity: number;
    movement_speed: number;
    population_cost: number;
    training_time: number;
    unit_type: string;
    civilization_name: string;
    military_building_name: string;
    createdAt: string;
    updatedAt: string;
}

export type UnitList = Unit[]

export type UnitListResponse = {
    rows: UnitList;
    count: number;
}