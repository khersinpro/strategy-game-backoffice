import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart4 } from "lucide-react";

export default function ResourceBuildingBonusCard() {
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Production de resource par niveau et par heure</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="py-4">
            <ul className="grid gap-4">
                <li>
                    {"Nombres d'unités: 8"}
                </li>
                <li>
                    Nombres de technologies: 12
                </li>
                <li>
                    Nombre de bâtiments spéciaux: 3
                </li>
            </ul>
        </CardContent>
    </Card>
    )
}