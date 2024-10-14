import React from "react"
import { Globe, Menu } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const AuthHeader = dynamic(() => import("./AuthHeader"), {
  loading: () => <AuthSkeleton />,
  ssr: false,
})

const AuthSkeleton = dynamic(() => import("../skeleton/AuthSkeleton"))

export default function Header() {
  return (
    <header className="bg-white text-teal-800 border-b sticky top-0 z-[999]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 sm:h-8 sm:w-8" />
          <h1 className="text-xl sm:text-2xl font-bold">Tripo-Rio</h1>
        </Link>
        
        <div className="md:hidden">
          {/* <AuthHeader /> */}
          </div>
        <div className="hidden md:flex items-center space-x-4">
          
          <nav className="space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-green-700">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-700">
              Contact
            </Link>
          </nav>
          <AuthHeader />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] mt-[55px]">
            <nav className="flex flex-col space-y-4">
              <Link href="/about" className="text-gray-600 hover:text-green-700">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-700">
                Contact
              </Link>
            </nav>
            <AuthHeader />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}