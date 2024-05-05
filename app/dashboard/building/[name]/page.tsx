import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import { auth } from "@/src/auth/auth";
import { getBuildingByName } from "@/src/service/building";
import BuildingDescriptionCard from "./_components/building-description-card";
import TownAllBuildingSpecializationCard from "./_components/townall-building-specialization";
import MilitaryBuildingSpecializationCard from "./_components/military-building-specialization-card";
import ResourceBuildingSpecializationCard from "./_components/resource-building-specialization-card";
import StorageBuildingSpecializationCard from "./_components/storage-building-specialization-card";
import WallBuildingSpecializationCard from "./_components/wall-building-specialization-card";
import BuildingLevelsCard from "./_components/building-levels-card";

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
                    <BuildingLevelsCard />
                    {building.type === 'town_all_building' && ( <TownAllBuildingSpecializationCard /> )}
                    {building.type === 'military_building' && ( <MilitaryBuildingSpecializationCard /> )}
                    {building.type === 'resource_building' && ( <ResourceBuildingSpecializationCard /> )}
                    {building.type === 'storage_building'  && ( <StorageBuildingSpecializationCard /> )}
                    {building.type === 'wall_building'     && ( <WallBuildingSpecializationCard /> )}

                </div>
            </div>
        </>
    )
}