"use client";
import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../ControlledInput/ControlledInput";
import SubmitButton from "../form/SubmitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendOtp from "@/hooks/useSendOtp";
import { catchError } from "@/utils/catchError";
import useForgotPasswordStore from "@/stores/orgotPasswordStore";


type TOtpInput = {
  email: string;
};
const otpVerifySchema = z.object({
  email: z.string({ required_error: "email is required" }).email(),
});

export default function ResendOtpModal() {
  const {setStepForgotPassStep,setEmail} = useForgotPasswordStore()
  const { mutateAsync, isPending ,error } = useSendOtp();
  const form = useForm<TOtpInput>({
    resolver: zodResolver(otpVerifySchema),
  });

  console.log(isPending);

  const onSubmit: SubmitHandler<TOtpInput> = async (formData) => {
    try {
      const response  = await  mutateAsync(formData.email);
      if(response.data.otpSent){
        setStepForgotPassStep(2)
        setEmail(response.data.email)
      }
    } catch (error) {

      catchError(error)
    }
    
  };
  console.log(error?.message)
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogDescription>
          Enter your email to receive a one-time password.
        </DialogDescription>
      </DialogHeader>
      <FormProvider {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <ControlledInput
              name="email"
              inputType="email"
              label="Email"
              placeholder="enter your account email"
              formControl={form.control}
            />
          </div>
          <SubmitButton isLoading={isPending} className="w-full">
            Send OTP
          </SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}
