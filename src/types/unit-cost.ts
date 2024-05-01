interface BaseUnitCost {
    unit_name: string;
    resource_name: string;
    quantity: number;
}

export interface UnitCost extends BaseUnitCost {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export type UnitCostList = UnitCost[]

export type CreateUnitCostData = BaseUnitCost

export type UpdateUnitCostData = BaseUnitCost