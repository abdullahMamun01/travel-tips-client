import { LogIn } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

const AuthenticationButtons = () => {
  return (
    <>
      <Link href="/login">
        <Button variant="ghost" className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-300 dark:text-blue-800 dark:hover:bg-blue-200">
          <LogIn className="mr-2 h-4 w-4" />
          Log In
        </Button>
      </Link>
      <Link href="/register">
        <Button className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-300 dark:text-blue-800 dark:hover:bg-blue-200">
          Sign Up
        </Button>
      </Link>
    </>
  );
};

export default AuthenticationButtons;
