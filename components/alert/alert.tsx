import { Frown, Laugh } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function SuccessAlert({ isSuccess, title, message, className }: { isSuccess: boolean, title: string, message: string, className?: string }) {
    return (
        isSuccess && (
            <Alert className={className}>
                <Laugh className="w-4 h-4" />
                <AlertTitle>
                    {title}
                </AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        )
    )
}

export function ErrorAlert({ isError, title, message, className }: { isError: boolean, title: string, message: string, className?: string}) {
    return (
        isError && (
            <Alert variant="destructive" className={className}>
                <Frown className="w-4 h-4" />
                <AlertTitle>
                    {title}
                </AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        )
    )
}