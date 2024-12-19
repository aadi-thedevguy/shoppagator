"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  forgotValidator,
  TForgotValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotValidator>({
    resolver: zodResolver(forgotValidator),
  });

  const { mutate: forgotPassword, isLoading } =
    trpc.auth.forgotPassword.useMutation({
      onSuccess: async () => {
        toast.success("Link sent successfully, Check your mail");
      },
      onError: (err) => {
        if (err.data?.code === "UNAUTHORIZED") {
          toast.error("Invalid Email");
        }
      },
    });

  const onSubmit = ({ email }: TForgotValidator) => {
    forgotPassword({ email });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center mb-8 lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Forgot Your Password ?
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Back to Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email" className="mb-2">
                    Registered Email:
                  </Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
