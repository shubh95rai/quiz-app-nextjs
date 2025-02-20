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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CgMenuGridO } from "react-icons/cg";
import { DarkModeSwitch } from "./DarkModeSwitch";

export default async function Navbar() {
  const session = await getSessionAction();

  return (
    <div className="flex justify-between items-center h-[60px] px-10 border-b shadow">
      <Link href="/" className="text-xl font-bold tracking-tighter">
        Quiz App
      </Link>
      <div>
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

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <CgMenuGridO />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/result" className="md:hidden">
                    <DropdownMenuItem>Result</DropdownMenuItem>
                  </Link>
                  <Link href="/leaderboard" className="md:hidden">
                    <DropdownMenuItem>Leaderboard</DropdownMenuItem>
                  </Link>

                  <DarkModeSwitch />

                  <DropdownMenuSeparator />

                  <form action={logoutAction}>
                    <button type="submit" className="text-red-500 w-full">
                      <DropdownMenuItem className="hover:!text-red-500">
                        Logout
                      </DropdownMenuItem>
                    </button>
                  </form>
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

        {!session?.user && (
          <form action={loginAction}>
            <Button>Login</Button>
          </form>
        )}
      </div>
    </div>
  );
}
