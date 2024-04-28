import AuthHeader from "@/components/layouts/auth-header";
import { auth } from "@/src/auth/auth";
import UserProfileCard from "./_components/user-profile-card";
import UserActivityCard from "./_components/user-activity-card";
import BackButton from "@/components/back-button";
import { getUserById } from "@/src/service/user";


export default async function UserPage({ params }: { params: { id: number } }) {
    const sessions = await auth();
    const token = sessions?.user ? sessions.user.token : '';
    const user = await getUserById(token, params.id);
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4"/>
                    <h1 className="mb-4 font-bold text-lg">Profile</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <UserProfileCard user={user} />
                    <UserActivityCard />
                </div>
            </div>
        </>
    )
}