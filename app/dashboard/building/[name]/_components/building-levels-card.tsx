import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart4 } from "lucide-react";

export default function BuildingLevelsCard() {
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Liste des niveaux du bâtiment</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="py-4">
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
    </Card>
    )
}