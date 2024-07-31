import { ICON_SIZE } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Settings, SidebarOpen } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
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
    <div className="mt-2 p-4">
      {links.map(({ id, icon, name, path }) => {
        const Icon = icon;
        const match = pathname === path;
        return (
          <Link to={path}>
            <div
              key={id}
              className={`rounded-md px-[5px] py-1 
              ${match ? "bg-primary " : "bg-secondary"}
              flex justify-between items-center my-5`}
            >
              <Link to={path}>
                <Button
                  className={`
                     bg-secondary text-white hover:text-black
                `}
                  size="sm"
                >
                  <Icon size={ICON_SIZE} />
                </Button>
              </Link>
              <AnimatePresence>
                {open ? (
                  <motion.p
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className={match ? "text-black" : "text-white"}
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

  return (
    <motion.div
      animate={{
        width: open ? "256px" : "80px",
      }}
      className={`bg-primary-foreground  h-full`}
    >
      <Header />
      <Separator className="bg-primary" />
      <Menu open={open} />
    </motion.div>
  );
}
