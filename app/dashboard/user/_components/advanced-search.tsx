'use client'

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FlaskConical, RotateCcw, UserRoundSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdvancedSearch() {
    const [id, setId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const router = useRouter();

    const redirectWithParams = () => {
        const searchParams = new URLSearchParams();
        id && searchParams.set('id', id);
        username && searchParams.set('username', username);
        email && searchParams.set('email', email);
        role && searchParams.set('role', role);

        router.push(`/dashboard/user?${searchParams.toString()}`)
    }

    const resetSearchParams = () => {
        setId('');
        setUsername('');
        setEmail('');
        setRole('');

        router.push('/dashboard/user');
    }

    return (
        <Collapsible className="px-4">
            <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-fit">
                    <UserRoundSearch className="h-4 w-4 mr-2" />
                    Recherche avancée
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-3">
                <Input
                    type="number"
                    placeholder="Identifiant"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />
                <Input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <Input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Select onValueChange={(field) => setRole(field)} value={role}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder="Role"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="ROLE_USER">Utilisateur</SelectItem>
                            <SelectItem value="ROLE_ADMIN">Administrateur</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
                    <Button variant='secondary' className="mr-3" onClick={redirectWithParams}>
                        <FlaskConical className="h-4 w-4 mr-2" />
                        Rechercher
                    </Button>
                    <Button variant="outline" onClick={resetSearchParams}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Réinitialiser
                    </Button>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}