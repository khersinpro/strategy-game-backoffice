"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BackButton ({ className }: { className?: string }) {
    const router = useRouter()
    return (
        <Button variant='outline' onClick={() => router.back()} className={cn("", className)}>
            <ArrowLeft className='h-4 w-4' />
        </Button>
    )
}