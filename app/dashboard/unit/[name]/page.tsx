import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import { auth } from "@/src/auth/auth";
import { getUnitByName } from "@/src/service/unit";
import UnitDescriptionCard from "./_components/unit-description-card";
import UnitStatsCard from "./_components/unit-stats-card";


export default async function UnitPage({ params }: { params: { name: string } }) {
    const session = await auth();
    const token = session?.user.token ? session.user.token : ''
    const unit = await getUnitByName(token, params.name)
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4" />
                    <h1 className="mb-4 font-bold text-lg">Unité</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <UnitDescriptionCard unit={unit} />
                    <UnitStatsCard unit={unit} />
                </div>
            </div>
        </>
    )
}