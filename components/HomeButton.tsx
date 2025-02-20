"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function HomeButton({ session }: { session: Session | null }) {
  const router = useRouter();

  function handleStartQuiz() {
    if (session?.user) {
      router.push("/quiz");
    } else {
      toast.error("You must be logged in to start the quiz");
    }
  }
  return (
    <form action={handleStartQuiz}>
      <Button className="text-lg px-5">I'm ready!</Button>
    </form>
  );
}
