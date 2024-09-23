import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import MainClient from "./_components/ui/MainClient";

const font = Public_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s - Personal Finance",
    default: "Welcome - Personal Finance app",
  },
  description: "Welcome to ease",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-beige-100 ${font.className} min-h-screen`}>
        <MainClient>{children}</MainClient>
      </body>
    </html>
  );
}
