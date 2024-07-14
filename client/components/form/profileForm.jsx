"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "./input";
import axios from "axios";

// Zod form schema
const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "last Name must be at least 2 characters.",
    }),
    phone: z.coerce.number({
      message: "phone number is required",
    }),
    email: z.string().email().min(2, {
      message: "email must be at least 2 characters.",
    }),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema), // Apply the zodResolver
  });

  console.log(form.formState.errors, "errors here");

  // handle submit function
  const onSubmit = async (formData) => {
    const res = await axios.post("http://localhost:8000/signup", formData);
    console.log(res, "res here");
  };

  return (
    <Card className="w-[50%] mx-auto my-10">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Get start with us by creating new one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4
          "
          >
            <FormInput
              label={"firstName"}
              register={form.register}
              type={"text"}
              name={"firstName"}
              placeholder={"Enter first name"}
            />
            <FormInput
              label={"lastName"}
              register={form.register}
              type={"text"}
              name={"lastName"}
              placeholder={"Enter last name"}
            />
            <FormInput
              label={"email"}
              register={form.register}
              type={"email"}
              name={"email"}
              placeholder={"Enter email"}
            />
            <FormInput
              label={"phone"}
              register={form.register}
              type={"number"}
              name={"phone"}
              placeholder={"Enter email"}
            />
            <FormInput
              name={"password"}
              label={"password"}
              register={form.register}
              type={"password"}
              placeholder={"Enter password"}
            />
            <FormInput
              name={"confirmPassword"}
              label={"confirm password"}
              register={form.register}
              type={"password"}
              placeholder={"Enter confirm password"}
              description={"confirm password and password should be same."}
            />
            <Button type="submit">Signup</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
