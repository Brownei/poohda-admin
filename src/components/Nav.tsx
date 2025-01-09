import { Link, useSearch, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react"
import { Dispatch, FC, SetStateAction, useState } from "react";
import { MdFeaturedVideo, MdHome, MdCheckBox, MdBusiness } from "react-icons/md";
import React from 'react'
import { ClipboardPaste, GroupIcon, House, LibraryBig, ListIcon, LogOut, Menu, Shirt, Truck, X } from "lucide-react";

type NavProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Nav: FC<NavProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation()
  const [navIsHoveredOn, setNavIsHoveredOn] = useState(false)

  function openSidebar() {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  }

  const navItems = [
    {
      name: 'Home',
      icon: <House className="size-6" />,
      url: "/home"
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

  function logOut() {
    localStorage.removeItem("admin")
    window.location.assign('/')
  }

  console.log(location)

  return (
    <AnimatePresence>
      <nav>
        <div className={`sticky top-0 h-screen overflow-hidden left-0  min-w-[300px] hidden lg:flex flex-col  gap-[20px]  bg-RichBlack text-PaleNimbus`}>
          <div className="p-6">
            <img src="/PoohDa White green.png" className="max-w-[250px]" alt="Logo" loading='lazy' />
          </div>
          {navItems.map((item) => (
            <Link to={item.url} className={`flex gap-3 relative font-Railway font-bold  justify-center py-2 text-[1rem] items-center ${location.pathname.includes(item.url) && 'text-RichBlack'}`}>
              <span>{item.icon}</span>
              {location.pathname.includes(item.url) && (
                <motion.span
                  layoutId="highlight"
                  initial={false}
                  transition={{ type: "spring", duration: 1, stiffness: 500, damping: 30 }}
                  className="bg-PaleNimbus absolute left-0 right-0 top-0 bottom-0 -z-10">
                </motion.span>
              )}
              {item.name}
            </Link>
          ))}
          <button onClick={logOut} className="mt-[40px] flex gap-3 font-Railway font-bold text-[1.2rem] items-center justify-center">
            <span><LogOut color="#ECF4E5" size={30} /></span>
            Logout
          </button>
        </div>

        <div className="fixed z-50 top-0 left-0 right-0 bg-RichBlack flex justify-between items-center p-5 max-h-[80px] lg:hidden">
          <img src="/PoohDa White green.png" className="max-w-[100px]" alt="Logo" loading='lazy' />
          <button onClick={openSidebar}>
            {isSidebarOpen ? <X color="#ECF4E5" size={30} /> : <Menu color="#ECF4E5" size={30} />}
          </button>
        </div>
      </nav>


      {isSidebarOpen && (
        <motion.div
          key="modal"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed z-50 top-0 h-screen overflow-hidden right-0 p-5 min-w-[300px] flex flex-col justify-center items-center gap-[40px]  bg-RichBlack text-PaleNimbus">
          <button onClick={openSidebar}>
            <X className="absolute top-5 right-10" color="#ECF4E5" size={30} />
          </button>
          {navItems.map((item) => (
            <Link to={item.url} onClick={() => setIsSidebarOpen(false)} className="flex gap-3 font-Railway font-bold text-[1.2rem] items-center">
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Nav
