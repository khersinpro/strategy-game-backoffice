import { RoundedBox } from "@/components/rounded-box";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Server } from "@/src/types/server";
import { Calendar, CalendarCheck2, Earth, KeyRound } from "lucide-react";
import ServerEditModal from "./server-edit-modal";
import { ServerDeleteModal } from "./server-delete-modal";

export default function ServerDescriptionCard({ server } : { server: Server }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Earth className="w-4 h-4 mr-2" />
                    <span>Descritpion du serveur</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Nom: </span> {server.name}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Crée le: </span>
                        {new Date(server.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(server.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <ServerEditModal server={server} />
                <ServerDeleteModal server={server} />
            </CardFooter>
        </Card>
    )
}