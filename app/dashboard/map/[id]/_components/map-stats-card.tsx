
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Map } from "@/src/types/map";
import { BarChart4 } from "lucide-react";

export default function MapStatsCard({ map }: { map: Map }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BarChart4 className="w-4 h-4 mr-2" />
                    <span>Statistiques de la carte</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4">
                <ul className="grid gap-4">
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, exercitationem.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, exercitationem.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, exercitationem.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, exercitationem.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, exercitationem.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, exercitationem.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, exercitationem.
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}