"use client";

import React from "react";
import { Button } from "../button";
import { Input } from "@/components/ui/input";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, Menu, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  return (
    <nav className="bg-[#113D48] text-white p-4 shadow-lg sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z" clipRule="evenodd" />
            </svg>
            <span>TravelWise</span>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#113D48] text-white hover:bg-[#1A5A6D] focus:bg-[#1A5A6D]">Destinations</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#113D48] to-[#1A5A6D] p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mt-4 text-lg font-medium text-white">Popular Destinations</div>
                            <p className="text-sm leading-tight text-white/90">
                              Explore our curated list of top travel destinations
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="/beaches" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#1A5A6D] hover:text-white focus:bg-[#1A5A6D] focus:text-white">
                            <div className="text-sm font-medium leading-none">Beaches</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/70">
                              Discover paradise on Earth
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="/mountains" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#1A5A6D] hover:text-white focus:bg-[#1A5A6D] focus:text-white">
                            <div className="text-sm font-medium leading-none">Mountains</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/70">
                              Reach new heights in your travels
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="/cities" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#1A5A6D] hover:text-white focus:bg-[#1A5A6D] focus:text-white">
                            <div className="text-sm font-medium leading-none">Cities</div>
                            <p className="line-clamp-2 text-sm leading-snug text-white/70">
                              Explore urban wonders around the globe
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/tips" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-[#113D48] text-white mx-5 hover:bg-[#1A5A6D] focus:bg-[#1A5A6D]">
                      Travel Tips
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-[#113D48] text-white hover:bg-[#1A5A6D] focus:bg-[#1A5A6D]">
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <form className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#113D48]" />
              <Input type="search" placeholder="Search destinations..." className="pl-8 bg-white text-[#113D48] placeholder-[#113D48]/70 border-[#1A5A6D] focus:ring-[#1A5A6D] focus:border-[#1A5A6D]" />
            </form>
          </div>
          <div className="hidden lg:block">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin} className="bg-white text-[#113D48] hover:bg-[#E6F3F5] focus:ring-2 focus:ring-white">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden bg-[#1A5A6D] text-white border-white hover:bg-[#236B82] focus:ring-2 focus:ring-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#113D48] text-white">
              <nav className="flex flex-col space-y-4">
                <Link href="/destinations" className="text-lg hover:text-[#E6F3F5]">Destinations</Link>
                <Link href="/tips" className="text-lg hover:text-[#E6F3F5]">Travel Tips</Link>
                <Link href="/about" className="text-lg hover:text-[#E6F3F5]">About Us</Link>
                {isLoggedIn ? (
                  <Button onClick={handleLogout} variant="outline" className="justify-start text-white border-white hover:bg-[#1A5A6D] hover:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                ) : (
                  <Button onClick={handleLogin} variant="outline" className="justify-start text-white border-white hover:bg-[#1A5A6D] hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
  );
}
