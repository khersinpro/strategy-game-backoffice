import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { FormErrorField } from "./form-errors";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface FormFieldProps extends React.ComponentProps<typeof Input> {
    className?: string;
    error?: string;
    label?: string;
    id?: string;
}

const CustomLabel = ({ label, id }: { label?: string, id?: string }) => {
    if (!label) return null
    return <Label htmlFor={id}>{label}</Label>
}

export function CustomFormField({ label, className, error, ...inputProps }: FormFieldProps) {
    return (
        <div className={cn("", className)}>
            <CustomLabel label={label} id={inputProps.id} />
            <Input {...inputProps} />
            <FormErrorField error={error} />
        </div>
    )
}

interface SelectFormFieldProps {
    data: string[];
    label: string;
    placeholder: string;
    error?: string;
    currentValue: string;
    onValueChange: (value: string) => void;
}

export function CustomSelectFormField({ data, label, placeholder, error, currentValue, onValueChange }: SelectFormFieldProps) {
    return (
        <div>
            <Select value={currentValue} onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {data.map((value, index) => (
                            <SelectItem
                                key={index}
                                value={value}
                            >
                                {value}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <FormErrorField error={error} />
        </div>
    )
}