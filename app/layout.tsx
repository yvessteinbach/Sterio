import type { Metadata } from "next";
import "./globals.css";

// Shadcn UI
import { ThemeProvider } from "@/components/theme/provider";

// Custom Components
import { Navbar } from "@/components/navigation/navbar";

// Metadata
export const metadata: Metadata = {
  title: "Sterio",
  description: "Radio Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Navbar />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
