import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { FormErrorField } from "./form-errors";

interface FormFieldProps extends React.ComponentProps<typeof Input> {
    className?: string;
    error?: string;
  }
  
  export function CustomFormField({ className, error, ...inputProps }: FormFieldProps) {
      return (
          <div className={cn("", className)}>
              <Input {...inputProps} />
              <FormErrorField error={error} />
          </div>
      )
  }