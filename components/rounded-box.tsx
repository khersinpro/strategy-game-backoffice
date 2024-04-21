import { cn } from "@/lib/utils";

export function RoundedBox({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("rounded-full bg-muted flex justify-center items-center shadow-md", className)}>
            {children}
        </div>
    )
}