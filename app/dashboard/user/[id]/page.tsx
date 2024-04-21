import AuthHeader from "@/components/layouts/auth-header";
import { RoundedBox } from "@/components/rounded-box";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/src/auth/auth";
import { User } from "@/src/types/user";
import axios from "axios";
import { Calendar, CalendarCheck2, KeyRound, Mail } from "lucide-react";

export async function getUserById(token: string, id: number): Promise<User> {
    try {
        return await axios.get(`${process.env.API_URL}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error;
    }
}

export default async function UserPage({ params }: { params: { id: number } }) {
    const sessions = await auth();
    const token = sessions?.user ? sessions.user.token : '';
    const user = await getUserById(token, params.id);
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <h1 className="mb-4">Profile</h1>
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className="ml-4">{user.username}</h2>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </>
    )
}