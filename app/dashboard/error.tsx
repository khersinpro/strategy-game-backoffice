'use client'

import dynamic from "next/dynamic"
const Button = dynamic(() => import("@/components/ui/button").then((mod) => mod.Button), { ssr: false })
const Card = dynamic(() => import("@/components/ui/card").then((mod) => mod.Card), { ssr: false })
const CardContent = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardContent), { ssr: false })
const CardFooter = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardFooter), { ssr: false })
const CardHeader = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardHeader), { ssr: false })
const CardTitle = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardTitle), { ssr: false })
const ExclamationTriangleIcon = dynamic(() => import("@radix-ui/react-icons").then((mod) => mod.ExclamationTriangleIcon), { ssr: false })

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center flex-1">
        <Card className="max-w-[550px] text-center">
            <CardHeader>
            <CardTitle className="flex text-destructive flex items-center justify-center text-lg">
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                {"Une erreur s'est produite"}
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p className="mb-2">
                {"Nous sommes désolés, mais une erreur s'est produite lors du chargement de cette page."}
            </p>
            <p className="mb-2">
                Si le problème persiste, veuillez contacter notre support technique.
            </p>
            </CardContent>
            <CardFooter>
            <Button className="w-full" variant="destructive" onClick={() => reset()}>Veuillez réessayer.</Button>
            </CardFooter>
        </Card>
    </div>
  )
}