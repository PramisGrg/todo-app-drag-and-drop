import { useForm, FormProvider } from "react-hook-form";
import { loginSchema } from "@/schema/login-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type loginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: loginSchemaType) => {
    console.log("Form Submitted: ", values);
  };

  return (
    <div className="relative">
      <h1 className="absolute left-1/2 md:text-3xl text-xl top-16 transform -translate-x-1/2">
        Drag and Drop Todo
      </h1>
      <div className="flex h-screen items-center justify-center">
        <div className="border p-8 rounded-lg md:w-[32rem] w-[90vw]">
          <h1 className="text-center text-xl">Login</h1>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Login</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
