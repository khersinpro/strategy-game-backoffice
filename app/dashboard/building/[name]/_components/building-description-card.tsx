import BuildingDeleteModal from "./building-delete-modal";
import BuildingEditModal from "./building-edit-modal";
import { RoundedBox } from "@/components/rounded-box";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building as BuildingIcon, Calendar, CalendarCheck2, Castle, KeyRound, ShieldAlert } from "lucide-react";
import { Building } from "@/src/types/building";

export default function BuildingDescriptionCard({ building, token }: { building: Building, token: string }) {
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Castle className="w-4 h-4 mr-2" />
                    <span>Descritpion du bâtiment</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Nom: </span> {building.name}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <BuildingIcon className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Type de bâtiment: </span> {building.type}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <ShieldAlert className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Commun: </span> {building.is_common ? 'Oui' : 'Non'}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Crée le: </span>
                        {new Date(building.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(building.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <BuildingEditModal building={building} token={token} />
                <BuildingDeleteModal building={building} token={token} />
            </CardFooter>
        </Card>
    )
}