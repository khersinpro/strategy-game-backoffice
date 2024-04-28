'use client'

import { ErrorAlert, SuccessAlert } from "@/components/alert/alert"
import { CustomFormField } from "@/components/form/form-inputs"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { ServerCreateSchema } from "@/src/schemas/server"
import { createServer } from "@/src/service/server"
import { ObjectKeyValueString } from "@/src/types/common"
import { handleZodError } from "@/src/utils/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useCallback, useState } from "react"
import { ZodError } from "zod"

export default function CreateServerForm() {
    const { data: session } = useSession()
    const token = session?.user.token ? session.user.token : ''
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<ObjectKeyValueString>({})
    const [success, setSuccess] = useState<boolean>(false)

    const handleSubmit = useCallback( async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setLoading(true)
            ServerCreateSchema.parse({ name })
            setErrors({})
            setSuccess(false)
            await createServer(token, name)
            setSuccess(true)
        } 
        catch (error: any) {
            if (error instanceof ZodError) {
                setErrors(handleZodError(error))
            }
            else {
                setErrors({ general: error.message ? error.message : 'Une erreur est survenue' })
            }
        }
        finally {
            setLoading(false)
        }
    }, [name, token])
    
    return (
        <div className="flex justify-center">
            <Card className="w-[450px] grid gap-4 p-4">
                <CardTitle>Créer un serveur</CardTitle>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <SuccessAlert 
                        isSuccess={success} 
                        title="Opération réussie" 
                        message="Le serveur a été créé avec succès" 
                    /> 
                    <ErrorAlert 
                        isError={!!errors.general}  
                        title="Une erreur est survenue" 
                        message={errors.general} 
                    />
                    <CustomFormField 
                        type="text" 
                        id="name" 
                        placeholder="Nom du serveur" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        error={errors.name} 
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