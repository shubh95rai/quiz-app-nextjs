"use server";

import { auth, signIn, signOut } from "@/auth";
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
        score,
        correctAnswers,
        incorrectAnswers,
      },
      create: {
        score,
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
    const result = await prisma.quizResult.findUnique({
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
