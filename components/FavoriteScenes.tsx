import React from "react";
import SceneCard from "./cards/SceneCard";
import { Icons } from "./common/icons";
import { scenes } from "@/config/constants";

const renderSceneIcon = (iconName: string, status: number) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent status={status} /> : null;
};

const FavoriteScenes = ({ override }: { override?: React.CSSProperties }) => {
  const renderSceneCards = () => {
    return scenes.map((scene, index) => (
      <SceneCard
        key={index}
        title={scene.title}
        icon={renderSceneIcon(scene.icon, scene.status)}
        status={scene.status}
      />
    ));
  };

  const groupedSceneCards = () => {
    const sceneCards = renderSceneCards();
    const groupedCards: JSX.Element[][] = [];
    for (let i = 0; i < sceneCards.length; i += 3) {
      groupedCards.push(sceneCards.slice(i, i + 3));
    }
    return groupedCards;
  };

  return (
    <div
      className="flex flex-col items-start gap-[9px] w-full"
      style={override}
    >
      <p className="text-white text-[21px] font-bold">Favorite Scenes</p>
      <div className="flex flex-col items-start gap-2 w-full h-auto">
        {groupedSceneCards().map((group, i) => (
          <div className="flex flex-wrap items-start gap-2.5" key={i}>
            {group}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteScenes;
