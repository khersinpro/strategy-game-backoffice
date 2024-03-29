import ThemeButton from "@/src/theme/ThemeButton";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


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