import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UserActivityCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {"Activités de l'utilisateur"}
                </CardTitle>
                <CardDescription>Présentation des dernières activités</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-4 py-4">
                <div>
                    <div className="text-sm text-muted-foreground">Dernière connexion</div>
                    <div className="text-md font-bold">Il y a 2 heures</div>
                </div>
                <div>
                    <div className="text-sm text-muted-foreground">Serveurs utilisés</div>
                    <ul className="text-md font-bold">
                        <li>Europe</li>
                        <li>Amérique</li>
                        <li>Asie</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}