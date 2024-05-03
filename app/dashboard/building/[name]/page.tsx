import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import { auth } from "@/src/auth/auth";
import { getBuildingByName } from "@/src/service/building";
import BuildingDescriptionCard from "./_components/building-description-card";

export default async function BuildingPage({ params }: { params: { name: string } }) {
    const session = await auth()
    const token = session?.user.token ? session.user.token : ''
    const building = await getBuildingByName(token, params.name)
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4" />
                    <h1 className="mb-4 font-bold text-lg">Bâtiment</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <BuildingDescriptionCard building={building} token={token} />
                </div>
            </div>
        </>
    )
}