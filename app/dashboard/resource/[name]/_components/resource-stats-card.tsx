
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Resource } from "@/src/types/resource";
import { BarChart4 } from "lucide-react";

export default function ResourceStatsCard({ resource }: { resource: Resource }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BarChart4 className="w-4 h-4 mr-2" />
                    <span>Statistiques du Serveur</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4">
                <ul className="grid gap-4">
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus.
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}