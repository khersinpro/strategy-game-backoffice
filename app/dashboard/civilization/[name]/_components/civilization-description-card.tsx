import { RoundedBox } from "@/components/rounded-box";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Civilization } from "@/src/types/civilization";
import { Calendar, CalendarCheck2, KeyRound, PersonStanding } from "lucide-react";
import CivilizationEditModal from "./civilization-edit-modal";
import { CivilizationDeleteModal } from "./civilization-delete-modal";

export default function CivilizationDescriptionCard({ civilization }: { civilization: Civilization }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <PersonStanding className="w-4 h-4 mr-2" />
                    <span>Descritpion de la civilization</span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Nom: </span> {civilization.name}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Crée le: </span>
                        {new Date(civilization.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(civilization.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <CivilizationEditModal civilization={civilization} />
                <CivilizationDeleteModal civilization={civilization} />
            </CardFooter>
        </Card>
    )
}