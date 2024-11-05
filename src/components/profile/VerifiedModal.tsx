'use client'
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SubscriptionForm from "../form/SubscriptionForm";
import { BadgeCheck } from "lucide-react";
export default function VerifiedModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center px-3 py-1 text-sm font-bold text-white bg-[#1d9bf0] hover:bg-[#1a8cd8] transition-colors rounded-full">
          <BadgeCheck className="w-4 h-4 mr-1" />
          <span>Get verified</span>
        </button>
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
