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
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useLoginQuery } from "@/queries/auth-query";

type loginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const loginUser = useLoginQuery();

  const onSubmit = (values: loginSchemaType) => {
    console.log("Form Submitted: ", values);
    loginUser.mutate(values, {
      onSuccess: (data) => {
        console.log(data, "This is login data");
        toast.success(data.message);
        Cookies.set("token", data.data.token, {
          path: "/",
          sameSite: "None",
          secure: true,
        });
        navigate("/home");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            toast.error(error.response.data.message || "Something went wrong!");
          } else {
            toast.error(error.message || "Something went wrong!");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
        form.reset();
      },
    });
  };

  return (
    <div className="relative">
      <h1 className="absolute left-1/2 md:text-3xl text-xl top-16 transform -translate-x-1/2">
        Drag and Drop Todo
      </h1>
      <div className="flex h-screen items-center justify-center">
        <div className="border p-8 rounded-lg md:w-[32rem] space-y-4 w-[90vw]">
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
            <div className="text-sm flex space-x-4">
              <h1>Don't have a account ?</h1>
              <Link to="/register" className="flex-end underline">
                click here
              </Link>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
