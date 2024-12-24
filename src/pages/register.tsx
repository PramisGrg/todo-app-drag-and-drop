import { useForm, FormProvider } from "react-hook-form";
import { registerSchema } from "@/schema/register-schema";
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
import { useNavigate } from "react-router-dom";
import { useRegisterQuery } from "@/queries/auth-query";
import { AxiosError } from "axios";

type registerSchemaType = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const registerUser = useRegisterQuery();

  const onSubmit = (values: registerSchemaType) => {
    console.log("Form Submitted: ", values);
    registerUser.mutate(values, {
      onSuccess: (data) => {
        console.log(data, "This is data");
        toast.success(data.message);
        navigate("/login");
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
        <div className="border p-8 rounded-lg space-y-4 md:w-[32rem] w-[90vw]">
          <h1 className="text-center text-xl">Register</h1>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
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

              <Button type="submit">Register</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Register;
