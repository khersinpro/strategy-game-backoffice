import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import MapDescriptionCard from "./_components/map-description-card";
import MapStatsCard from "./_components/map-stats-card";
import { auth } from "@/src/auth/auth";
import { getMapById } from "@/src/service/map";

export default async function ServerPage({ params }: { params: { id: number } }) {
    const session = await auth();
    const token = session?.user.token ? session.user.token : ''
    const map = await getMapById(token, params.id)
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4" />
                    <h1 className="mb-4 font-bold text-lg">Carte</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <MapDescriptionCard map={map} />
                    <MapStatsCard map={map} />
                </div>
            </div>
        </>
    )
}