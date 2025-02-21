import { getAllQuizResults, getSessionAction } from "@/actions/actions";
import PageLayout from "@/components/PageLayout";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LeaderboardPage() {
  const session = await getSessionAction();

  if (!session?.user) {
    redirect("/");
  }

  const allQuizResults = await getAllQuizResults();
  return (
    <PageLayout>
      <div className="md:max-w-xl max-w-lg w-full py-8">
        {allQuizResults && allQuizResults.length > 0 ? (


          <div className="text-center space-y-4">

            <h1 className="text-2xl font-bold tracking-tighter">Leaderboard</h1>

            <div className="border rounded-lg p-4 shadow space-y-4">
              {allQuizResults.map((result, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <Image
                          src={result.user.image || ""}
                          alt="profile picture"
                          width={40}
                          height={40}
                        />
                      </Avatar>
                      <p className="font-semibold">
                        {result.user.newName || result.user.name}
                      </p>
                    </div>
                    <div className=" bg-muted-foreground text-background py-2 px-4 rounded-lg font-semibold">
                      {result.score} points
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-muted-foreground">
            {" "}
            No results found
          </div>
        )}
      </div>
    </PageLayout>
  );
}
