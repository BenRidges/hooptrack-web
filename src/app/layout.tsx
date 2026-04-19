import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HoopTrack — Basketball Training Tracker",
    template: "%s | HoopTrack",
  },
  description:
    "Track every shot with computer vision. HoopTrack maps your zones, measures Shot Science, and shows your progress over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
