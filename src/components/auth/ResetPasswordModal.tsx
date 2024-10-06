import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";



import { LockIcon } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../ControlledInput/ControlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/validate-schema/password.schema";
import useResetPassword from "@/hooks/useResetPassword";
import SubmitButton from "../form/SubmitButton";
import useForgotPasswordStore from "@/stores/orgotPasswordStore";



type TResetPassword = {
  password:string ,
  confirmPassword:string
}


export default function ResetPasswordModal() {
  const form = useForm<TResetPassword>({
    resolver:zodResolver(resetPasswordSchema)
  });
  const {mutateAsync , isPending} = useResetPassword()
  const {email,setStepForgotPassStep} = useForgotPasswordStore()

  const onSubmit: SubmitHandler<TResetPassword> = async(formData) => {
    const response = await mutateAsync({email , newPassword:formData.password})
    if(response.success){
      setStepForgotPassStep(0)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <LockIcon className="h-5 w-5 text-primary" />
          Update Password
        </DialogTitle>
        <DialogDescription>Please enter your new password.</DialogDescription>
      </DialogHeader>
      <FormProvider {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <ControlledInput
              name="password"
              placeholder="enter your new password"
              formControl={form.control}
              inputType="password"
              label="New Passwrod"
            />
          </div>
          <div>
            <ControlledInput
              name="confirmPassword"
              placeholder="confirm password"
              formControl={form.control}
              inputType="password"
              label="Confirm Passwrod"
            />
          </div>
          <SubmitButton isLoading={isPending} className="w-full">
            Reset Password
          </SubmitButton>
        </form>
      </FormProvider>
    </>
  );
}
