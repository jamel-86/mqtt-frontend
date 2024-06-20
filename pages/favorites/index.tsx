import React from "react";

import FavoritesLayout from "@/layouts/favorites";
import HomeScreen from "@/components/views/HomeScreen";

export default function DocsPage() {
  const [on, setOn] = React.useState(true);

  const toggle = () => {
    setOn(!on);
  };

  return (
    <FavoritesLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-2 md:py-4">
        <div className="inline-block max-w-lg text-center justify-start">
          {/* <h1 className={title()}>Favorites</h1> */}
        </div>
        <HomeScreen />
      </section>
    </FavoritesLayout>
  );
}
