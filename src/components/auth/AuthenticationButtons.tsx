import { LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

const AuthenticationButtons = () => {
  return (
    <div>
      <Link href="/login">
        <Button
          variant="ghost"
          className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-300 dark:text-blue-800 dark:hover:bg-blue-200"
        >
          <LogIn className="mr-2 h-4 w-4" />
          <span className="max-md:hidden">Log In</span>
        </Button>
      </Link>
      <Link href="/register">
        <Button
          variant="ghost"
          className="bg-white max-md:hidden text-blue-600 hover:bg-blue-50 dark:bg-blue-300 dark:text-blue-800 dark:hover:bg-blue-200"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="max-md:hidden">Signup</span>
        </Button>
      </Link>
    </div>
  );
};

export default AuthenticationButtons;
