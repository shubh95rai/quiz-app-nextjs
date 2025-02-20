"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import quizData from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { saveQuizResult } from "@/actions/actions";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const router = useRouter();

  const { question, options, answer, type } = quizData[currentQuestion];

  useEffect(() => {
    // console.log("useffect");
    if (timeLeft === 0) {
      handleNext(true);
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        return prev - 1;
      });
    }, 1000);
    return () => {
      return clearInterval(timer);
    };
  }, [timeLeft]);

  async function handleNext(timeout = false) {
    const rightAnswer = answer;
    const userAnswer = selectedAnswer.trim().toLowerCase();

    const isAnswerCorrect =
      type === "multiple-choice"
        ? selectedAnswer === rightAnswer
        : userAnswer === rightAnswer.toLocaleLowerCase();

    if (!timeout) {
      if (isAnswerCorrect) {
        setScore(score + 1);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setTimeLeft(30);
    } else {
      await saveQuizResult(score, correctAnswers, incorrectAnswers);
      toast.success("Quiz completed successfully!");
      router.push("/result");
    }
  }

  function handleAnswerSubmit() {
    if (!selectedAnswer.trim()) {
      toast.error("Please select an answer");
      return;
    }

    toast.dismiss();
    handleNext(false);
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4">
      <div className="border max-w-xl w-full p-4 rounded-lg shadow flex flex-col gap-6">
        {/* Question and options */}

        <div className="flex justify-between items-center">
          <p className="bg-primary py-1 px-4 rounded-lg text-background shadow">
            Question : {currentQuestion + 1} / {quizData.length}
          </p>
          <p className="bg-primary py-1 px-4 rounded-lg text-background shadow">
            {timeLeft}s remaining
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{question}</h2>
          {type === "multiple-choice" ? (
            <div className="flex flex-col gap-2">
              {options.map((option, index) => {
                return (
                  <Button
                    key={index}
                    variant={"outline"}
                    className={
                      selectedAnswer === option
                        ? "bg-accent text-accent-foreground pointer-events-none"
                        : ""
                    }
                    onClick={() => {
                      setSelectedAnswer(option);
                    }}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          ) : (
            <div>
              <Input
                type="text"
                name="answer"
                placeholder="Answer"
                value={selectedAnswer}
                onChange={(e) => {
                  setSelectedAnswer(e.target.value);
                }}
              />
            </div>
          )}
        </div>
        <Button onClick={handleAnswerSubmit}>
          {currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
}
