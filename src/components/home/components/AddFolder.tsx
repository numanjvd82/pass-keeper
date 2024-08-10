import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useAddFolder } from "@/lib/hooks/data/useAddFolder";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";

const folderSchema = z.object({
  name: z.string().min(1).max(50),
});

type FolderValues = z.infer<typeof folderSchema>;

type Props = {
  refetch: () => void;
};

export const AddFolder: React.FC<Props> = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: addFolder } = useAddFolder();

  const form = useForm<FolderValues>({
    resolver: zodResolver(folderSchema),
  });

  async function onSubmit({ name }: FolderValues) {
    try {
      await addFolder(name, {
        onSuccess: () => {
          form.reset();
          toast({
            title: "Folder added",
            variant: "default",
          });
          setOpen(false);
          refetch();
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.reset();
        setOpen(false);
      }
    }
  }

  const disableSubmission = !form.formState.isValid;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new folder</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Folder Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={disableSubmission} type="submit">
                Add
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
