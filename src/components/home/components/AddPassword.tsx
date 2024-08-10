import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAddPassword } from "@/lib/hooks/data/useAddPassword";
import { useFolders } from "@/lib/hooks/useFolders";
import { InputType } from "@/lib/types";
import { ICON_SIZE } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const addPasswordSchema = z.object({
  passwordName: z.string({
    required_error: "Password name is required",
  }),
  folderId: z.string(),
  username: z.string({
    required_error: "Username is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
  uri: z.string().url().optional(),
  notes: z.string().optional(),
});

export type AddPasswordForm = z.infer<typeof addPasswordSchema>;

type Props = {
  refetch: () => void;
};

export const AddPassword: React.FC<Props> = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const { data: folders } = useFolders();
  const { mutateAsync: addPassword } = useAddPassword();
  const form = useForm<AddPasswordForm>({
    resolver: zodResolver(addPasswordSchema),
    defaultValues: {
      folderId: "0", // Default to no folder
    },
  });

  async function onSubmit(values: AddPasswordForm) {
    try {
      const input = {
        ...values,
        folderId:
          parseInt(values.folderId) === 0 ? null : parseInt(values.folderId),
      };
      await addPassword(input, {
        onSuccess: () => {
          form.reset();
          refetch();
          setOpen(false);
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        form.reset();
        setOpen(false);
      }
    }
  }

  const formInputs: {
    name: keyof AddPasswordForm;
    label: string;
    placeholder: string;
    type: InputType;
  }[] = [
    {
      name: "passwordName",
      label: "Name",
      placeholder: "e.g. Facebook",
      type: "text",
    },
    {
      name: "folderId",
      label: "Folder",
      placeholder: "e.g. Social",
      type: "select",
    },
    {
      name: "username",
      label: "Username",
      placeholder: "e.g. john.doe",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "e.g. password123",
      type: "password",
    },
    {
      name: "uri",
      label: "URI",
      placeholder: "e.g. https://facebook.com",
      type: "text",
    },
    {
      name: "notes",
      label: "Notes",
      placeholder: "e.g. Password for Facebook",
      type: "comment",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {formInputs.map(({ name, label, placeholder, type }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        {type === "text" || type === "password" ? (
                          <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                          />
                        ) : type === "comment" ? (
                          <Textarea placeholder={placeholder} {...field} />
                        ) : type === "select" ? (
                          <CustomSelect
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            list={folders}
                            placeholder={placeholder}
                            getItemValue={(item) => String(item.id)}
                            renderItem={(item) => item.name}
                            {...field}
                          />
                        ) : null}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit">Add</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
