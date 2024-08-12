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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Header } from "@/components/ui/Header";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/lib/AuthProvider";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { onLogin } = useAuth();
  const { setTheme } = useTheme();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginValues) {
    try {
      onLogin(values.email, values.password);
    } catch (error: any) {
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
          <CardHeader className="p-4">Login</CardHeader>
          <CardDescription className="px-6 py-1 font-semibold text-center">
            Don't have an account? Click here to
            <Link to="/signup" className="text-blue-500">
              Sign up
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@mail.com" {...field} />
                      </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={form.formState.isLoading} type="submit">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
