import { SidebarOpen } from "lucide-react";
import { Button } from "./button";

export function Sidebar() {
  return (
    <div className="bg-primary-foreground w-64 h-full">
      <div className="p-4 flex justify-between items-center">
        <Button>
          <SidebarOpen size={24} />
        </Button>
        <p>Pass Keeper</p>
      </div>
    </div>
  );
}
