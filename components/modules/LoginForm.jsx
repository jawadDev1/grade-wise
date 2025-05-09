"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import Spinner from "../common/Spinner";
import { loginSchema } from "@/schemas/loginSchema";

export function LoginForm({ className, handleFormChange, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        callbackUrl: callbackUrl,
        ...data,
      });

      if (response && response.error && response.status === 401)
        throw new Error(response.error);
      toast({
        title: "Signed In successfully.",
        description: "You are now logged in.",
      });
      router.push(callbackUrl);
    } catch (error) {
      if (error instanceof Error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        {...field}
                      />
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Login"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => {
                  signIn("google", {
                    callbackUrl,
                  });
                }}
              >
                <GoogleIcon />
                Continue with Google
              </Button>
              <div
                onClick={() => handleFormChange("signup")}
                className="mt-4 text-center text-sm  cursor-pointer"
              >
                Don&apos;t have an account? Sign up
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
