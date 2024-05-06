import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigUpDash } from "lucide-react";
import { auth } from "@/src/auth/auth";
import { getBuildingLevelsAndCostByBuildingName } from "@/src/service/building_level";
import BuildingLevelAccordion from "./building-level-accordion";

export default async function BuildingLevelsCard() {
    const session = await auth();
    const token = session?.user ? session.user.token : '';
    const buildingLevels = await getBuildingLevelsAndCostByBuildingName(token, 'barrack');

    return (
        <Card className="flex flex-col row-span-3">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <ArrowBigUpDash className="w-4 h-4 mr-2" />
                    <span>Liste des niveaux du bâtiment</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 py-4">
                <BuildingLevelAccordion token={token} levels={buildingLevels} />
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-end items-center py-4">
                <Button>Ajouter un niveau</Button>
            </CardFooter>
        </Card>
    )
}