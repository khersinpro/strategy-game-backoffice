import { Frown, Laugh } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function SuccessAlert({ isSuccess, title, message }: { isSuccess: boolean, title: string, message: string }) {
    return (
        isSuccess && (
            <Alert>
                <Laugh className="w-4 h-4" />
                <AlertTitle>
                    {title}
                </AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        )
    )
}

export function ErrorAlert({ isError, title, message }: { isError: boolean, title: string, message: string }) {
    return (
        isError && (
            <Alert variant="destructive">
                <Frown className="w-4 h-4" />
                <AlertTitle>
                    {title}
                </AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        )
    )
}