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
export default function VerifiedModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  size="sm">
          Verify Profile
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
        <SubscriptionForm/>
  
      </DialogContent>
    </Dialog>
  );
}
