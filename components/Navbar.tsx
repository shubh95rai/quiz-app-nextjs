import { getSessionAction, loginAction, logoutAction } from "@/actions/actions";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CgMenuGridO } from "react-icons/cg";

export default async function Navbar() {
  const session = await getSessionAction();

  return (
    <div className="flex justify-between items-center h-[60px] px-10 border-b shadow">
      <Link href="/" className="text-xl font-bold tracking-tighter">
        Quiz App
      </Link>
      <div className="flex items-center gap-4">
        {session?.user && (
          <div className="flex gap-2 items-center">
            <div className="hidden md:block">
              <Link href="/result">
                <Button variant={"ghost"}>Result</Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant={"ghost"}>Leaderboard</Button>
              </Link>
            </div>

            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} variant={"outline"}>
                    <CgMenuGridO />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href="/result">
                    <DropdownMenuItem>Result</DropdownMenuItem>
                  </Link>
                  <Link href="/leaderboard">
                    <DropdownMenuItem>Leaderboard</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Avatar className="size-9 border shadow-sm">
              <Image
                src={session?.user?.image || ""}
                width={50}
                height={50}
                alt="profile picture"
              />
            </Avatar>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <ModeToggle />

          {session?.user ? (
            <form action={logoutAction}>
              <Button variant={"outline"}>Logout</Button>
            </form>
          ) : (
            <form action={loginAction}>
              <Button>Login</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
