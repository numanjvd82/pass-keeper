import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEditFolder } from "@/lib/hooks/data/useEditFolder";
import { Folder } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  folder: Folder;
  closeFolderDropdown: () => void;
  refetch: () => void;
};

const editFolderSchema = z.object({
  name: z.string().min(1).max(50),
});

type EditFolderValues = z.infer<typeof editFolderSchema>;

export const EditFolder: React.FC<Props> = ({
  folder,
  refetch,
  closeFolderDropdown,
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<EditFolderValues>({
    resolver: zodResolver(editFolderSchema),
    defaultValues: {
      name: folder?.name ?? "",
    },
  });
  const { mutateAsync: editFolder } = useEditFolder();

  async function onSubmit({ name }: EditFolderValues) {
    try {
      await editFolder(
        { id: folder.id, name },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
            refetch();
            closeFolderDropdown();
          },
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.reset();
      }
    }
  }

  // e.stopPropagation() prevents the click event from bubbling up to the parent

  const disableSubmission = !form.formState.isValid;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
        asChild
      >
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
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
                      <Input placeholder="New Folder name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={disableSubmission} type="submit">
                Edit
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
