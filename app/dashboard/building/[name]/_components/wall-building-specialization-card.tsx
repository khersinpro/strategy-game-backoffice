import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart4 } from "lucide-react";

export default function WallBuildingSpecializationCard() {
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <BarChart4 className="w-4 h-4 mr-2" />
                <span>Bonus de défense par niveau</span>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="py-4">
            <ul className="grid gap-4">
                <li>
                    <p className="font-semibold">Niveau 1: 0%</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 2: 10%</p>
                </li>
                <li>
                    <p className="font-semibold">Niveau 3: 20%</p>
                </li>
            </ul>
        </CardContent>
    </Card>
    )
}