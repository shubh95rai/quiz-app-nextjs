import { getSessionAction } from "@/actions/actions";
import HomeButton from "@/components/HomeButton";

export default async function Home() {
  const session = await getSessionAction();

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-2 tracking-tighter">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter">
          Ready to take this Quiz?
        </h1>
        <p>Get ready to ace it.</p>
        <HomeButton session={session} />
      </div>
    </div>
  );
}
