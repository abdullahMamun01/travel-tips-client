/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import clsx from "clsx";
import { Label } from "../ui/label";

type TControlledInputProps = {
  name: string;
  label: string;
  placeholder: string;

  inputType: string;
  formControl: Control<any>;
  className?: string;
};

export default function ControlledInput({
  name,
  label,
  placeholder,

  inputType,
  formControl,
  className,
}: TControlledInputProps) {
  

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label htmlFor={name}>{label}</Label>
          <FormControl>
            <Input
                id={name}
              placeholder={placeholder}
              className={clsx(className)}
              type={inputType || "text"}
              {...field}
              value={field.value ?? ''}
            />
          </FormControl>

          <FormMessage className="uppercase" />
        </FormItem>
      )}
    />
  );
}
