
export function FormErrorField({ error }: { error?: string }) {
    return (
        error && <p className="text-red-500 text-sm ml-2 mt-1">{error}</p>
    )
}