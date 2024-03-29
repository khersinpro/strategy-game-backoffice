import ThemeButton from "@/src/theme/ThemeButton";

export default function Header({ children } : { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <header className="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                {/* Theme button */}
                <ThemeButton />
            </header>
            {children}
        </div>
    )
}