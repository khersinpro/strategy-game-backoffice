import { BuildingCostEditRows } from "./building-cost-edit-row";
import { BuildingLevelEditRow } from "./building-level-edit-row";
import { BuildingLevelWithCostList } from "@/src/types/building_level";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function BuildingLevelAccordion({ token, levels }: { token: string, levels: BuildingLevelWithCostList }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                levels.map((level, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>Niveau {level.level}</AccordionTrigger>
                        <AccordionContent className="grid gap-2">
                            <h2 className="font-semibold">Temps de construction</h2>
                            <BuildingLevelEditRow buildingLevel={level} token={token} />
                            <h2 className="font-semibold">Coûts de construction</h2>
                            <BuildingCostEditRows buildingCosts={level.Building_costs} token={token} />
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
        </Accordion>

    )
}