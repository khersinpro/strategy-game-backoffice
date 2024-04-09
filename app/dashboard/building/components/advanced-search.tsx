import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FlaskConical, RotateCcw, UserRoundSearch } from "lucide-react";

export default function AdvancedSearch() {
    return (
        <Collapsible>
            <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-fit">
                    <UserRoundSearch className="h-4 w-4 mr-2" />
                    Recherche avancée
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-3">
                <Input type="text" placeholder="Nom de bâtiment" />
                <Input type="text" placeholder="Type de bâtiment" />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Bâtiment commun" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">Oui</SelectItem>
                            <SelectItem value="0">Non</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
                    <Button variant='secondary' className="mr-3">
                        <FlaskConical className="h-4 w-4 mr-2" />
                        Rechercher
                    </Button>
                    <Button variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Réinitialiser
                    </Button>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}