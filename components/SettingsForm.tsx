"use client";

import { User } from "@prisma/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "./LoadingButton";
import { chnageNameAction } from "@/actions/actions";
import { toast } from "sonner";

const FormSchema = z.object({
  newName: z
    .string()
    .min(1, { message: "Please enter a name" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be less than 20 characters" })
    .trim(),
});

export type TFormSchema = z.infer<typeof FormSchema>;

export default function SettingsForm({
  sessionUser,
}: {
  sessionUser: User | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newName: sessionUser?.newName || sessionUser?.name || "",
    },
  });

  async function onSubmit(data: TFormSchema) {
    const result = await chnageNameAction(data);

    if (!result.success) {
      toast.error(result.message);
    }

    toast.success(result.message);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 text-start"
    >
      <p className="font-semibold text-start ml-1">Name</p>
      <Input
        type="text"
        spellCheck={false}
        placeholder="Enter your name"
        className="bg-background"
        {...register("newName")}
      />
      {errors.newName && (
        <p className="text-red-500 text-sm">{errors.newName.message}</p>
      )}

      <LoadingButton pending={isSubmitting}>Save</LoadingButton>
    </form>
  );
}
