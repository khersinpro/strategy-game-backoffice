import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import { auth } from "@/src/auth/auth";
import { getBuildingByName } from "@/src/service/building";
import BuildingDescriptionCard from "./_components/building-description-card";
import TownAllBuildingBonusCard from "./_components/building-bonus/town-all-building-bonus";
import MilitaryBuildingBonusCard from "./_components/building-bonus/military-building-bonus-card";
import ResourceBuildingBonusCard from "./_components/building-bonus/resource-building-bonus-card";
import StorageBuildingBonusCard from "./_components/building-bonus/storage-building-bonus-card";
import WallBuildingBonusCard from "./_components/building-bonus/wall-building-bonus-card";
import BuildingLevelsCard from "./_components/building-level/building-levels-card";

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
                    <BuildingLevelsCard building={building} />
                    {building.type === 'town_all_building' && ( <TownAllBuildingBonusCard /> )}
                    {building.type === 'military_building' && ( <MilitaryBuildingBonusCard /> )}
                    {building.type === 'resource_building' && ( <ResourceBuildingBonusCard /> )}
                    {building.type === 'storage_building'  && ( <StorageBuildingBonusCard /> )}
                    {building.type === 'wall_building'     && ( <WallBuildingBonusCard /> )}
                </div>
            </div>
        </>
    )
}