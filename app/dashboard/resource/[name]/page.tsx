import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import ResourceDescriptionCard from "./_components/resource-description-card";
import ResourceStatsCard from "./_components/resource-stats-card";
import { auth } from "@/src/auth/auth";
import { getResourceByName } from "@/src/service/resource";

export default async function ResourcePage({ params }: { params: { name: string } }) {
    const session = await auth();
    const token = session?.user.token ? session.user.token : ''
    const resource = await getResourceByName(token, params.name)
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4" />
                    <h1 className="mb-4 font-bold text-lg">Ressource</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ResourceDescriptionCard resource={resource} />
                    <ResourceStatsCard resource={resource} />
                </div>
            </div>
        </>
    )
}