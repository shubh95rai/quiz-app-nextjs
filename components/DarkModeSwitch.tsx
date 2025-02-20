"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export function DarkModeSwitch() {
  const { setTheme } = useTheme();
  return (
    <div className="flex items-center space-x-2 transition-all p-2">
      <Label htmlFor="dark-mode" className="font-normal">
        Dark Mode
      </Label>
      <Switch
        className="scale-90"
        id="dark-mode"
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      />
    </div>
  );
}
