import BackButton from "@/components/back-button";
import AuthHeader from "@/components/layouts/auth-header";
import { auth } from "@/src/auth/auth";
import axios from "axios";
import { UnitType } from "@/src/types/unit-type";
import UnitTypeDescriptionCard from "./_components/unit-type-description-card";
import UnitTypeStatsCard from "./_components/unit-type-stats-card";

export async function getUnitTypeByType(token: string, type: string): Promise<UnitType> {
    try {
        return await axios.get(`${process.env.API_URL}/unit-type/${type}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    catch (error) {
        throw error;
    }
}

export default async function UnitTypePage({ params }: { params: { type: string } }) {
    const session = await auth();
    const token = session?.user.token ? session.user.token : ''
    const unitType = await getUnitTypeByType(token, params.type)
    return (
        <>
            <AuthHeader />
            <div className="px-4">
                <div className="flex items-center">
                    <BackButton className="mb-4 mr-4" />
                    <h1 className="mb-4 font-bold text-lg">{"Type d'unité"}</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <UnitTypeDescriptionCard unitType={unitType} />
                    <UnitTypeStatsCard unitType={unitType} />
                </div>
            </div>
        </>
    )
}