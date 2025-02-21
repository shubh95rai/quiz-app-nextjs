import { getQuizResult, getSessionAction } from "@/actions/actions";
import PageLayout from "@/components/PageLayout";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ResultPage() {
  const session = await getSessionAction();

  if (!session?.user) {
    redirect("/");
  }

  const quizResult = await getQuizResult();
  // console.log(quizResult);
  return (
    <PageLayout>
      <div className="md:max-w-xl max-w-lg w-full py-8">
        {quizResult ? (
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold tracking-tighter">Results</h1>
            <div className="grid md:grid-cols-2 gap-4 text-center ">
              <StatCard
                title="Percentage"
                value={`${(quizResult.score / 10) * 100}%`}
              />
              <StatCard title="Total Questions" value="10" />
              <StatCard title="Total Score" value={quizResult.score} />
              <StatCard
                title="Correct Answers"
                value={quizResult.correctAnswers}
              />
              <StatCard
                title="Incorrect Answers"
                value={quizResult.incorrectAnswers}
              />
            </div>
            <div>
              <Link href="/quiz">
                <Button variant={"outline"} className="font-semibold shadow">
                  Take a New Quiz
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-muted-foreground">
            You have not taken the quiz yet
          </div>
        )}
      </div>
    </PageLayout>
  );
}
