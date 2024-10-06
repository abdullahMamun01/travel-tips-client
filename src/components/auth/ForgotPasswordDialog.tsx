"use client";
import React from "react";
import ResendOtpModal from "@/components/auth/ResendOtpModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import OtpVerifyModal from "./OtpVerifyModal";

import useForgotPasswordStore from "@/stores/orgotPasswordStore";
import ResetPasswordModal from "./ResetPasswordModal";

export default function ForgotPasswordDialog() {
  const { forgotPasswordStep } = useForgotPasswordStore();

  const renderForgotPasswordContent = () => {
    if (forgotPasswordStep === 1) return <ResendOtpModal />;
    if (forgotPasswordStep === 2) return <OtpVerifyModal />;
    if (forgotPasswordStep === 3) return <ResetPasswordModal />;
  };

  return (
    <div className="mt-4 text-center text-sm">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="text-primary hover:underline">
            Forgot your password?
          </Button>
        </DialogTrigger>
        <DialogContent>{renderForgotPasswordContent()}</DialogContent>
      </Dialog>
    </div>
  );
}
