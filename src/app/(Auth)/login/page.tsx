
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import LoginForm from "@/components/auth/LoginForm";

import React from "react";

export default function LoginPage() {
  return (
    <div>

      <LoginForm />
      <ForgotPasswordDialog/>
    </div>
  );
}
