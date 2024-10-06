'use client'
import React from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../ControlledInput/ControlledInput";
import { TRegisterFormFields } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidateSchema } from "@/validate-schema/auth.schema";
import SubmitButton from "../form/SubmitButton";
import useRegister from "@/hooks/auth/useRegiste";

export default function RegisterationForm() {
  
  const form = useForm<TRegisterFormFields>({
    resolver: zodResolver(registerValidateSchema)
  });
  const {mutateAsync , isPending} = useRegister()
  const onSubmit : SubmitHandler<TRegisterFormFields> = async (formData) =>{
    await mutateAsync(formData)
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <ControlledInput
            name="firstName"
            formControl={form.control}
            label="First Name"
            inputType="text"
            placeholder="enter your first name"
          />
        </div>
        <div>
          <ControlledInput
            name="lastName"
            formControl={form.control}
            label="Last Name"
            inputType="text"
            placeholder="enter your last name"
          />
        </div>
        <div>
          <ControlledInput
            name="email"
            formControl={form.control}
            label="Email"
            inputType="email"
            placeholder="enter your email"
          />
        </div>
        <div>
          <ControlledInput
            name="password"
            formControl={form.control}
            label="Password"
            inputType="password"
            placeholder="enter your password"
          />
        </div>
        <div>
          <ControlledInput
            name="phone"
            formControl={form.control}
            label="Phone No."
            inputType="phone"
            placeholder="enter your phone no."
          />
        </div>
        <div>
          <ControlledInput
            name="address"
            formControl={form.control}
            label="Address"
            inputType="text"
            placeholder="enter your address"
          />
        </div>
        <SubmitButton  isLoading={isPending} className="w-full">
          Create Account
        </SubmitButton>
      </form>
    </FormProvider>
  );
}
