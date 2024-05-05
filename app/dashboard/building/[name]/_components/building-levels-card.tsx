import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowBigUpDash, BarChart4 } from "lucide-react";

export default function BuildingLevelsCard() {
    return (
        <Card className="flex flex-col">
        <CardHeader>
            <CardTitle className="flex items-center">
                <ArrowBigUpDash className="w-4 h-4 mr-2" />
                <span>Liste des niveaux du bâtiment</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 py-4">
            <ul className="grid gap-4">
                <li>
                    <p className="font-semibold">Niveau 1</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 2</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 3</p>
                </li>
            </ul>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end items-center py-4">
            <Button>Ajouter un niveau</Button>
        </CardFooter>
    </Card>
    )
}