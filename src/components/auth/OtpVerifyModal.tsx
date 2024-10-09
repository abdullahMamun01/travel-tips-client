import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ControlledInput from "../ControlledInput/ControlledInput";
import useVerifyOtp from "@/hooks/useVerifyOtp";
import useForgotPasswordStore from "@/stores/orgotPasswordStore";
import { catchError } from "@/utils/catchError";
import SubmitButton from "../form/SubmitButton";

type TOtpVerify = {
  otp: string;
};

const otpValidate = z.object({
  otp: z.string({ required_error: "otp is required" }),
});

export default function OtpVerifyModal() {
  const { setStepForgotPassStep, email } = useForgotPasswordStore();
  const form = useForm<TOtpVerify>({
    resolver: zodResolver(otpValidate),
  });

  const { mutateAsync, isPending } = useVerifyOtp();

  const onSubmit: SubmitHandler<TOtpVerify> = async (formData) => {
    try {
      const response = await mutateAsync({ email, ...formData });

      if (response.data.otpVerified) {
        setStepForgotPassStep(3);
      }
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogDescription>
          Please enter the one-time password sent to your email.
        </DialogDescription>
      </DialogHeader>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <ControlledInput
              name="otp"
              formControl={form.control}
              inputType="text"
              label="OTP"
              placeholder="Enter your 6 digi otp"
            />
          </div>
          <SubmitButton isLoading={isPending} className="w-full">
            Verify OTP
          </SubmitButton>
        </form>
      </FormProvider>
    </>
  );
}
