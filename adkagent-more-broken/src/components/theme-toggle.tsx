"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Always render the same structure to avoid hydration mismatches
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="h-4 w-4 transition-transform" />
        ) : (
          <Moon className="h-4 w-4 transition-transform" />
        )
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
