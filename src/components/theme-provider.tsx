import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Wraps `next-themes` with the adila.co defaults. The theme is applied via the
 * `.dark` class on `<html>` (matching the adila.co `@custom-variant dark`).
 * `<html>` must carry `suppressHydrationWarning` — see `__root.tsx`.
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
