import React from "react";

import { title } from "@/components/common/primitives";
import DefaultLayout from "@/layouts/default";
import HomeScreen from "@/components/views/HomeScreen";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>About</h1>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <HomeScreen />
        </div>
      </section>
    </DefaultLayout>
  );
}
