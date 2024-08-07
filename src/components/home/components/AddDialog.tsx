import { ICON_SIZE } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export const AddPasswordDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus size={ICON_SIZE} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Store your credentials</DialogTitle>
          <DialogDescription>
            Fill in the details below to store your credentials.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name" />
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Password" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
