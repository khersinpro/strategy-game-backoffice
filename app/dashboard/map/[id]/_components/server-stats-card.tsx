
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Server } from "@/src/types/server";
import { BarChart4 } from "lucide-react";

export default function ServerStatsCard({ server }: { server: Server }) {
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
                        Nombres de joueurs: 345
                    </li>
                    <li>
                        Nombres de joueurs en ligne: 45
                    </li>
                    <li>
                        Nombre de villages total: 1345
                    </li>
                    <li>
                        Nombre de villages actifs: 345
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}