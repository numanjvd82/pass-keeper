import { ICON_SIZE } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Moon, Settings, SidebarOpen, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Separator } from "./separator";

const links = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    id: 2,
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Menu = ({ open }: { open: boolean }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex-1 mt-2 p-4">
      {links.map(({ id, icon, name, path }) => {
        const Icon = icon;
        const match = pathname === path;
        return (
          <Link key={id} to={path}>
            <div
              className={`transition-all rounded-md px-[5px] py-1 
              ${match ? "dark:bg-secondary-foreground bg-secondary " : ""}
              flex justify-between items-center my-5`}
            >
              <Button size="sm">
                <Icon size={ICON_SIZE} />
              </Button>
              <AnimatePresence>
                {open ? (
                  <motion.p
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className={`text-sm ${match && "dark:text-black"}`}
                  >
                    {name}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const Header = () => {
    return (
      <div className="p-5 flex justify-between items-center ">
        <Button onClick={() => setOpen(!open)} size="sm">
          <SidebarOpen size={ICON_SIZE} />
        </Button>
        <AnimatePresence>
          {open ? (
            <motion.p
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="font-semibold text-sm"
            >
              Pass Keeper
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  };

  const Footer = () => {
    const { setTheme } = useTheme();
    return (
      <div className="p-2 transition-all">
        <div className="ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      animate={{
        width: open ? "256px" : "80px",
      }}
      className={`dark:bg-primary-foreground border-r-[1px]  h-full flex flex-col`}
    >
      <Header />
      <Separator />
      <Menu open={open} />
      <Separator />
      <Footer />
    </motion.div>
  );
}
