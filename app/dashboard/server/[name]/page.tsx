import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import { auth } from "@/src/auth/auth";
import ServerDescriptionCard from "./_components/server-description-card";
import ServerStatsCard from "./_components/server-stats-card";
import { getServerByName } from "@/src/service/server";

export default async function ServerPage({ params }: { params: { name: string } }) {
    const session = await auth();
    const token = session?.user.token ? session.user.token : ''
    const server = await getServerByName(token, params.name)
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4" />
                    <h1 className="mb-4 font-bold text-lg">Serveur</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ServerDescriptionCard server={server} />
                    <ServerStatsCard server={server} />
                </div>
            </div>
        </>
    )
}