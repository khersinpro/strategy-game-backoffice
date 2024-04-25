
import { RoundedBox } from "@/components/rounded-box";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Map } from "@/src/types/map";
import { Axis3D, Calendar, CalendarCheck2, Earth, KeyRound } from "lucide-react";
import MapEditModal from "./map-edit-modal";
import { MapDeleteModal } from "./map-delete-modal";

export default function MapDescriptionCard({ map } : { map: Map }) {
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Earth className="w-4 h-4 mr-2" />
                    <span>Descritpion de la carte</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Id: </span> {map.id}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Axis3D className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Hauteur en case: </span> {map.y_area}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Axis3D className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Largeur en case: </span> {map.x_area}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Crée le: </span>
                        {new Date(map.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(map.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <MapEditModal map={map} />
                <MapDeleteModal map={map} />
            </CardFooter>
        </Card>
    )
}