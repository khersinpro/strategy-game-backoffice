import AuthHeader from "@/components/layouts/auth-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/src/auth/auth";
import { User } from "@/src/types/user";
import axios from "axios";
import UserProfileCard from "./_components/user-profile-card";
import UserActivityCard from "./_components/user-activity-card";

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
                    <UserProfileCard user={user} />
                    <UserActivityCard />
                </div>
            </div>
        </>
    )
}