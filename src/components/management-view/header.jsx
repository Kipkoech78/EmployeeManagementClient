

import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ManagementViewHeaderMenuItems } from '@/config';
import { useDispatch, useSelector } from "react-redux";
import barnerImg from '../../assets/ruth.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DiscIcon,
  HousePlus,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import { logoutUser } from '@/store/authSlice';
function MenuItems() {
  const localhost = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams('')
  function handleNavigate(currentItem) {
    sessionStorage.removeItem("filters");
    const currentfilterItem =
      currentItem.id !== "home" && currentItem.id !== "products" && currentItem.id !== 'search'
        ? { category: [currentItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentfilterItem));
    location.pathname.includes('listing') && currentfilterItem !== null ?
    setSearchParams(new URLSearchParams(`?category=${currentItem.id}`))  :
    navigate(currentItem.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:items-center lg:flex-row gap-6">
      {/* {ManagementViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer"
        >
          {menuItem.label}
        </Label>
      ))} */}
    </nav>
  );
}

function ManagementHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("User Info", user);

  return (
    <header className="sticky top-0  w-full  border-b bg-blue-500 h-40">
      <div className="flex h-full items-center justify-between px-10 md:px-6">
        <Link to={"/shop/home"} className="flex gap-3 items-center ">
          <img src={barnerImg}  alt='' className='rounded-full   w-30 h-30'/>
          <span className="font-bold text-2xl">Employee Management</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="lg:hidden" variant="outlined">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Togglle Header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}
function HeaderRightContent() {
  const [openUserCartSheet, setOpenUserCartSheet] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const username = user?.userName;
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black w-16 h-16">
            <AvatarFallback className="bg-black text-white text-[30px] font-extrabold justify-items-center ">
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-55">
          <DropdownMenuLabel> Logged in as {username} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCog className="mr-2 w-6 h-6" /> Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 w-6 h-6" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ManagementHeader