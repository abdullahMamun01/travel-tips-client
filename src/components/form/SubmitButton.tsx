import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

type TSubmitButtonProps = {
  children: ReactNode;
  isLoading: boolean;
  className?: string;
  disabled?:boolean
};

export default function SubmitButton({
  children,
  isLoading = false,
  className,
  disabled
}: TSubmitButtonProps) {
  const takeClass  =className  || `w-full bg-teal-500`
  return (
    <Button type="submit" disabled={disabled || false} className={cn(takeClass)}>
      {isLoading ? (
        <>
          <Spinner size="small" className="mr-2" /> Submiting...
        </>
      ) : (
        <>{children} </>
      )}
      
    </Button>
  );
}
