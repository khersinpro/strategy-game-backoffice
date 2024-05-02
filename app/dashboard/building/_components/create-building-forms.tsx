"use client"

import { CustomSelectFormField } from "@/components/form/form-inputs";
import { Card, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import CreateMilitaryBuildingForm from "./create-military-building-form";
import CreateResourceBuildingForm from "./create-resource-building-form";
import CreateStorageBuildingForm from "./create-storage-building-form";
import CreateWallBuildingForm from "./create-wall-building-form";

export default function CreateBuildingForms({ token }: { token: string }) {
    const [selectedType, setSelectedType] = useState<string>('')
    const buildingTypes = ['military_building', 'resource_building', 'storage_building', 'wall_building']
    return (
        <div className="flex justify-center px-4">
            <Card className="w-full max-w-[400px] grid gap-6 p-6">
                <CardTitle className="text-center">Créer un bâtiment </CardTitle>
                <form>
                    <CustomSelectFormField 
                        label="Type de bâtiment" 
                        placeholder="Selection du type de bâtiment" 
                        data={buildingTypes} 
                        currentValue={selectedType}
                        onValueChange={setSelectedType}
                    />
                </form>
                <CreateMilitaryBuildingForm isSelected={selectedType === 'military_building'} token={token} />
                <CreateResourceBuildingForm isSelected={selectedType === 'resource_building'} token={token} />
                <CreateStorageBuildingForm isSelected={selectedType === 'storage_building'} token={token} />
                <CreateWallBuildingForm isSelected={selectedType === 'wall_building'} token={token} />
            </Card>
        </div>
    )
}