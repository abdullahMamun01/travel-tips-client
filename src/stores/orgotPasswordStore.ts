// stores/forgotPasswordStore.ts
import { create } from "zustand";

interface ForgotPasswordState {
  email: string;
  otpSent: boolean;
  otpVerified: boolean;
  setEmail: (email: string) => void;
  forgotPasswordStep: number;
  setOtpSent: (status: boolean) => void;
  setOtpVerified: (status: boolean) => void;
  setStepForgotPassStep: (step: number) => void;
}

const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  email: "",
  otpSent: false,
  otpVerified: false,
  forgotPasswordStep: 1,
  setEmail: (email: string) => set({ email }),
  setOtpSent: (status: boolean) => set({ otpSent: status }),
  setOtpVerified: (status: boolean) => set({ otpVerified: status }),
  setStepForgotPassStep: (step: number) => set({ forgotPasswordStep: step }),
}));

export default useForgotPasswordStore;
