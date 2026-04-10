import type { Metadata } from "next";

import { DemoProvider } from "@/components/demo/demo-provider";
import { DemoRouteGuard } from "@/components/demo/demo-route-guard";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "FriendAway",
  description: "A location-first social network for people living abroad."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-text antialiased">
        <DemoProvider>
          <DemoRouteGuard />
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
