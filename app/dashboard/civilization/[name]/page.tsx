import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import CivilizationDescriptionCard from "./_components/civilization-description-card";
import CivilizationStatsCard from "./_components/civilization-stats-card";
import { auth } from "@/src/auth/auth";
import { getCivilizationByName } from "@/src/service/civilization";

export default async function CivilizationPage({ params }: { params: { name: string } }) {
    const session = await auth()
    const token = session?.user.token ? session.user.token : ''
    const civilization = await getCivilizationByName(token, params.name)
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4" />
                    <h1 className="mb-4 font-bold text-lg">Civilisation</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <CivilizationDescriptionCard civilization={civilization} />
                    <CivilizationStatsCard />
                </div>
            </div>
        </>
    )
}