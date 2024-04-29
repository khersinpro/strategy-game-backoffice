import ResourceDeleteModal from "./resource-delete-modal";
import ResourceEditModal from "./resource-edit-modal";
import { RoundedBox } from "@/components/rounded-box";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Axe, Calendar, CalendarCheck2, KeyRound } from "lucide-react";
import { Resource } from "@/src/types/resource";

export default function ResourceDescriptionCard({ resource } : { resource: Resource }) {
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Axe className="w-4 h-4 mr-2" />
                    <span>Descritpion de la resource</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Nom: </span> {resource.name}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Crée le: </span>
                        {new Date(resource.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(resource.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <ResourceEditModal resource={resource} />
                <ResourceDeleteModal resource={resource} />
            </CardFooter>
        </Card>
    )
}