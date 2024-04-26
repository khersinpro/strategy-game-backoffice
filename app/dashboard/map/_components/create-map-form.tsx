'use client'

import axios from "axios"
import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { ObjectKeyValueString } from "@/src/types/common"
import { ServerList } from "@/src/types/server"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { ZodError } from "zod"
import { getAllServers } from "../../server/page"
import { CreateMapSchema } from "@/src/schemas/map"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormErrorField } from "@/components/form/form-errors"

export default function CreateMapForm() {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [serverName, setServerName] = useState<string>('')
    const [xArea, setXArea] = useState<number>(0)
    const [yArea, setYArea] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [success, setSuccess] = useState<boolean>(false)
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

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            CreateMapSchema.parse({
                server_name: serverName,
                x_area: xArea,
                y_area: yArea
            })
            setErrors({})
            setSuccess(false)
            await axios.post(`${process.env.API_URL}/map`,
                {
                    server_name: serverName,
                    x_area: xArea,
                    y_area: yArea
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setSuccess(true)
            setLoading(false)
        }
        catch (error: any) {
            setLoading(false)
            if (error instanceof ZodError) {
                setErrors(handleZodError(error))
            }
            else {
                setErrors({ general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
    }, [token, serverName, xArea, yArea])

    return (
        <div className="flex justify-center">
            <Card className="w-[450px] grid gap-4 p-4">
                <CardTitle>Créer une carte</CardTitle>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <SuccessAlert
                        isSuccess={success}
                        title="Opération réussie"
                        message="La carte a été créée avec succès."
                    />
                    <ErrorAlert
                        isError={!!errors.general}
                        title="Une erreur est survenue"
                        message={errors.general}
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
                        error={errors.x_area}
                    />
                    <CustomFormField
                        type="number"
                        id="y_area"
                        placeholder="Hauteur de la carte"
                        value={yArea}
                        onChange={(e) => setYArea(Number(e.target.value))}
                        error={errors.y_area}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading && <ReloadIcon className="animate-spin mr-2" />}
                        Créer
                    </Button>
                </form>
            </Card>
        </div>
    )
}