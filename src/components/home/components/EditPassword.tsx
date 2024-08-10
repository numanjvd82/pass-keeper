import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

type Props = {
  title: string;
};

export const EditPassword: React.FC<Props> = ({ title }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <h3 className="text-md font-medium text-primary cursor-pointer">
          {title}
        </h3>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit your stored credentials</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
