import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MdFeaturedVideo, MdHome, MdCheckBox, MdBusiness } from "react-icons/md";
import React from 'react'
import { ClipboardPaste, GroupIcon, House, LibraryBig, ListIcon, Shirt, Truck } from "lucide-react";

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function openSidebar() {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  }

  const navItems = [
    {
      name: 'Home',
      icon: <House className="size-6" />,
      url: "/"
    },
    {
      name: 'Clothes',
      icon: <Shirt className="size-6" />,
      url: "/clothes"
    },
    {
      name: 'Categories',
      icon: <LibraryBig className="size-6" />,
      url: "/categories"
    },
    {
      name: 'Orders',
      icon: <Truck className="size-6" />,
      url: "/orders"
    },
    {
      name: 'Waitlist',
      icon: <ListIcon className="size-6" />,
      url: "/waitlist"
    },
  ]

  return (
    <nav className="sticky top-0 h-screen overflow-hidden left-0 p-5 min-w-[300px] flex flex-col items-center gap-[40px]  bg-RichBlack text-PaleNimbus">
      <img src="../../public/PoohDa White green.png" className="max-w-[250px]" />
      {navItems.map((item) => (
        <Link to={item.url} className="flex gap-3 font-Railway font-bold text-[1.2rem] items-center">
          <span>{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
