import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UnitType } from "@/src/types/unit-type";
import { BarChart4 } from "lucide-react";

export default function UnitTypeStatsCard({ unitType }: { unitType: UnitType }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BarChart4 className="w-4 h-4 mr-2" />
                    <span>{"Statistiques du type d'unité"}</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4">
                <ul className="grid gap-4">
                    <li>
                        Lorem ipsum dolor sit.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet.
                    </li>
                    <li>
                        Lorem ipsum dolor sit.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet.
                    </li>
                    <li>
                        Lorem ipsum dolor sit.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet.
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}