// create a new layout for the favorites page that will be used in the frontend/pages/favorites.tsx file
import { Link } from "@nextui-org/react";

import { Head } from "./head";

import { Navbar } from "@/components/common/navbar";

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-2">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/jamel-86"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Created with ❤️</span>
          <p className="text-primary">By Jamel</p>
        </Link>
      </footer>
    </div>
  );
}
