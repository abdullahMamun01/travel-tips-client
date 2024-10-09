"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  ArrowRight,
  Trophy,
  AlertTriangle,
  Loader,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import useVerifyPayment from "@/hooks/payment/useVerifyPayment";
import useAuth from "@/stores/authSore";
import toast from "react-hot-toast";
interface PaymentSuccessProps {
  searchParams: {
    session_id: string;
  };
}
export default function PaymentSuccess({
  searchParams: { session_id },
}: PaymentSuccessProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const { auth } = useAuth();

  const { mutateAsync, status, error } = useVerifyPayment();

  useEffect(() => {
    // Trigger confetti animation for payment success
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });


    // Start verification using the mutation hook
    const verifyPayment = async () => {
      await mutateAsync({
        token: auth?.token as string,
        session_id,
      }); // Trigger payment verification
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
    };

    if (auth) {
   
      verifyPayment();
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 150);

    // Countdown timer for redirect
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(countdownInterval);
    };
  }, [auth?.token]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Payment Successful!
          </CardTitle>
          <CardDescription>Your profile is being verified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Do not close this tab</AlertTitle>
            <AlertDescription>
              Please keep this page open while we verify your profile. This
              process may take a few moments.
            </AlertDescription>
          </Alert>

          {!status && !error ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Verifying your profile...</span>
                <Loader className="h-4 w-4 animate-spin" />
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Verification Failed!</AlertTitle>
              <AlertDescription>
                An error occurred during verification. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Profile Verified!</AlertTitle>
              <AlertDescription>
                Your profile has been successfully verified. You now have access
                to premium features.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center">
            <Badge variant="secondary" className="text-lg py-1 px-3">
              <Trophy className="mr-1 h-4 w-4" />
              Verified User
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Redirecting to your profile in {countdown} seconds...
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={() => router.push("/profile")}>
            Go to Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => router.push("/explore")}>
            Explore Content
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
