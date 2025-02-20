"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data } = useSession();

  const router = useRouter();

  function handleStartQuiz() {
    if (data?.user) {
      router.push("/quiz");
    } else {
      console.log("gg");
      toast.error("You must be logged in to start the quiz");
    }
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-2 tracking-tighter">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
          Ready to take this Quiz?
        </h1>
        <p>Get ready to ace it.</p>
        <form action={handleStartQuiz}>
          <Button className="text-lg px-6 ">I'm ready!</Button>
        </form>
      </div>
    </div>
  );
}
