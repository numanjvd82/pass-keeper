import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Header } from "@/components/ui/Header";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useRegister } from "@/lib/hooks/data/useRegister";
import { Link, useNavigate } from "react-router-dom";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
        password
      );
    }),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function Signup() {
  const { toast } = useToast();
  const { mutateAsync, isLoading } = useRegister();
  const { setTheme } = useTheme();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  async function onSubmit(values: RegisterValues) {
    try {
      const successful = await mutateAsync(values);
      if (!successful) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong!.",
        });
      }
      toast({
        title: "Success",
        description: "Account created successfully.",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      form.reset();
    }
  }

  return (
    <>
      <Toaster />
      <Header setTheme={setTheme} />
      <div
        style={{
          height: "calc(100vh - 3rem)",
        }}
        className="flex justify-center items-center"
      >
        <Card>
          <CardHeader className="p-4">Sign up</CardHeader>
          <CardDescription className="px-6 py-1 font-semibold text-center">
            Create an account to get started. Already have an account?
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </CardDescription>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@mail.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        We'll never share your email with anyone else.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters long and contain
                        at least one uppercase, lowercase, number, and special
                        character.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type="submit">
                  Sign up
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
