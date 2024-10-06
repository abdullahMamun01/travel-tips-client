import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import clsx from "clsx";

type TSubmitButtonProps = {
  children: ReactNode;
  isLoading: boolean;
  className?: string;
};

export default function SubmitButton({
  children,
  isLoading = false,
  className,
}: TSubmitButtonProps) {
  return (
    <Button type="submit" className={cn(clsx(className, `w-full bg-teal-500`))}>
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
