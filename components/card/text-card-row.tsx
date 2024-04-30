import { LucideIcon } from "lucide-react";
import { RoundedBox } from "../rounded-box";

export default function TextCardRow ({label, value, Icon}: {label: string, value: string | number, Icon: LucideIcon}) {
    return (
        <div className="flex items-center">
        <RoundedBox className="h-8 w-8 mr-2">
            <Icon className="h-4 w-4" />
        </RoundedBox>
        <p>
            <span className="font-semibold">{label}</span> {value}
        </p>
    </div>
    )
}