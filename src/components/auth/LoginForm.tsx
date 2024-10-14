"use client";
import React from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "../ControlledInput/ControlledInput";
import SubmitButton from "../form/SubmitButton";
import { TLogin } from "@/types/auth.type";
import useLogin from "@/hooks/auth/useLogin";

import useAuth from "@/stores/authSore";

const loginValidateSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email("enter valid email"),
  password: z.string({ required_error: "password is required" }),
});

export default function LoginForm() {
  const { setAuth } = useAuth();

  const form = useForm<TLogin>({
    defaultValues: {},
    resolver: zodResolver(loginValidateSchema),
  });

  const { mutateAsync, isPending } = useLogin();

  const onSubmit: SubmitHandler<TLogin> = async (formData) => {
    const response = await mutateAsync(formData);
    if (response.success) {
      const user = response.data;
      setAuth({
        token: response.token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user?._id,
          phone: user.phone || "",
          address: user.address || "",
          isVerified: user.isVerified,
          role: user.role 
        },
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <ControlledInput
            placeholder="you@example.com"
            name="email"
            inputType="email"
            label="Email"
            formControl={form.control}
          />
        </div>
        <div>
          <ControlledInput
            placeholder="enter your password"
            name="password"
            inputType="password"
            label="Password"
            formControl={form.control}
          />
        </div>
        <SubmitButton isLoading={isPending} className="w-full bg-teal-500">
          Sign in
        </SubmitButton>
      </form>
    </FormProvider>
  );
}
