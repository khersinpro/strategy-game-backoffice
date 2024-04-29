"use client"

import { ErrorAlert } from "@/components/alert/alert"
import { FormErrorField } from "@/components/form/form-errors"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateMap } from "@/src/service/map"
import { getAllServers } from "@/src/service/server"
import { Map, UpdateMapFormErrors } from "@/src/types/map"
import { ServerList } from "@/src/types/server"
import { handleZodError } from "@/src/utils/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { z } from "zod"

export default function MapEditModal({ map }: { map: Map }) {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [open, setOpen] = useState<boolean>(false)
    const [serverName, setServerName] = useState<string>(map.server_name)
    const [xArea, setXArea] = useState<number>(map.x_area)
    const [yArea, setYArea] = useState<number>(map.y_area)
    const [errors, setErrors] = useState<UpdateMapFormErrors>({})
    const router = useRouter()
    const [servers, setServers] = useState<ServerList>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllServers(token)
            setServers(data)
        }

        if (token && token !== '') {
            fetchData()
        }
    }, [token])

    const submitUpdates = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setErrors({})
            await updateMap(token, map.id, {
                server_name: serverName,
                x_area: xArea,
                y_area: yArea
            })
            setOpen(false)
            router.refresh()
        }
        catch (error: any) {
            if (error instanceof z.ZodError) {
                setErrors({ ...errors, ...handleZodError(error) })
            }
            else {
                setErrors({ ...errors, general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [token, errors, router, serverName, xArea, yArea, map.id])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modification du serveur</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 pt-4" onSubmit={submitUpdates}>
                    <ErrorAlert
                        isError={!!errors.general}
                        title="Une erreur est survenue"
                        message={errors.general as string}
                    />
                    <div>
                        <Select value={serverName} onValueChange={setServerName}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selection du serveur" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Serveurs</SelectLabel>
                                    {servers.map((server, index) => (
                                        <SelectItem
                                            key={index}
                                            value={server.name}
                                        >
                                            {server.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormErrorField error={errors.server_name} />
                    </div>
                    <CustomFormField
                        type="number"
                        id="x_area"
                        placeholder="Largeur de la carte"
                        value={xArea}
                        onChange={(e) => setXArea(Number(e.target.value))}
                        error={(errors.x_area ?? "").toString()}
                    />
                    <CustomFormField
                        type="number"
                        id="y_area"
                        placeholder="Hauteur de la carte"
                        value={yArea}
                        onChange={(e) => setYArea(Number(e.target.value))}
                        error={(errors.y_area ?? "").toString()}
                    />
                    <Button type="submit">Sauvegarder les modifications</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
