import { RoundedBox } from "@/components/rounded-box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@/src/types/user";
import { Calendar, CalendarCheck2, KeyRound, Mail, Users } from "lucide-react";

export default function UserProfileCard({ user }: { user: User }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Avatar className="mr-4"> 
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {user.username}
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 grid gap-4">
                <h3 className="font-semibold">Informations :</h3>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <KeyRound className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">identifiant: </span> {user.id}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Mail className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">email: </span> {user.email}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <Calendar className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Inscription le: </span>
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center">
                    <RoundedBox className="h-8 w-8 mr-2">
                        <CalendarCheck2 className="h-4 w-4" />
                    </RoundedBox>
                    <p>
                        <span className="font-semibold">Mis à jour le: </span>
                        {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between py-4">
                <Button>Modifier</Button>
                <Button variant="destructive">Susprendre</Button>
            </CardFooter>
        </Card>
    )
}