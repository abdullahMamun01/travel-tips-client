import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "./SubmitButton";
import usePayment from "@/hooks/payment/usePayment";
import useAuth from "@/stores/authSore";

// Define the TypeScript interface
interface ISubscriptionForm {
  subscriptionType: "monthly" | "yearly"; // Match this with the Controller name
}

// Create the Zod schema for validation
const subscriptionSchema = z.object({
  subscriptionType: z.enum(["monthly", "yearly"]), // Ensure this matches the field in the form
});

export default function SubscriptionForm() {
  const { mutateAsync, isPending } = usePayment();

  const form = useForm<ISubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
  });

  const {
    formState: { errors },
  } = form;
  const { auth } = useAuth();
  // Handle form submission
  const onSubmit: SubmitHandler<ISubscriptionForm> = async (formdata) => {
    const response = await mutateAsync({
      token: auth?.token as string,
      price: formdata.subscriptionType === "monthly" ? 10 : 99,
      profileName: `${auth?.user?.firstName} ${auth?.user?.lastName}`,
      ...formdata,
    });
    const data = response.data 
    if(data.sessionUrl){
      window.location.href = data.sessionUrl;
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="subscriptionType" // Ensure this matches the schema
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup value={value} onValueChange={onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">1 Month ($9.99)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly">1 Year ($99.99)</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.subscriptionType && (
            <span className="text-red-500">
              {errors.subscriptionType.message}
            </span>
          )}
          <div className="mt-4">
            <SubmitButton  isLoading={isPending}>
              Subscribe
            </SubmitButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
