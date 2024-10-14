import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import SubscriptionForm from "../form/SubscriptionForm";
import { Check } from "lucide-react";
export default function VerifiedModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative w-full inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-green-400 to-teal-500 p-0.5 font-medium text-gray-900 hover:text-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 dark:text-white"
        >
          <span className="relative flex items-center rounded-full bg-white px-5 py-2.5 transition-all duration-200 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            <Check className="mr-2 h-4 w-4" />
            Verify Profile
          </span>
        </Button>

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Your Profile</DialogTitle>
          <DialogDescription>
            Choose a subscription plan to verify your profile and unlock premium
            features.
          </DialogDescription>
        </DialogHeader>
        <SubscriptionForm />
      </DialogContent>
    </Dialog>
  );
}
