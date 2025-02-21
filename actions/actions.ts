"use server";

import { auth, signIn, signOut } from "@/auth";
import { TFormSchema } from "@/components/SettingsForm";
import { prisma } from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSessionAction() {
  const session = await auth();
  return session;
}
export async function getSessionUserAction() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  return user;
}

export async function loginAction() {
  await signIn("google");
}
export async function logoutAction() {
  await signOut();
  revalidatePath("/");
  redirect("/");
}

export async function saveQuizResult(
  score: number,
  correctAnswers: number,
  incorrectAnswers: number
) {
  const user = await getSessionUserAction();
  try {
    await prisma.quizResult.upsert({
      where: {
        userId: user?.id,
      },
      update: {
        score: score * 5,
        correctAnswers,
        incorrectAnswers,
      },
      create: {
        score: score * 5,
        correctAnswers,
        incorrectAnswers,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
}

export async function getQuizResult() {
  const user = await getSessionUserAction();

  try {
    const result = await prisma.quizResult.findFirst({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
      },
    });
    return result;
  } catch (error) {
    console.error("Error getting quiz result:", error);
  }
}

export async function getAllQuizResults() {
  try {
    const quizResults = await prisma.quizResult.findMany({
      include: {
        user: true,
      },
      orderBy: {
        score: "desc",
      },
    });

    return quizResults;
  } catch (error) {
    console.error("Error getting quiz results:", error);
  }
}

export async function chnageNameAction(data: TFormSchema) {
  const sessionUser = await getSessionUserAction();

  try {
    await prisma.user.update({
      where: {
        id: sessionUser?.id,
      },
      data: {
        newName: data.newName,
      },
    });
    return {
      success: true,
      message: "Your name has been updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again later",
    };
  }
}
