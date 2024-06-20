import React from "react";

import { Icons } from "./common/icons";
import Badge from "./badges/Badge";

import data from "@/config/items.json";

const renderIcon = (
  iconName: string,
  status: number,
  height: number,
  width: number
) => {
  const IconComponent = Icons[iconName];

  return IconComponent ? (
    <IconComponent status={status} height={height} width={width} />
  ) : null;
};

const FavoriteBadges = ({ override }: { override?: React.CSSProperties }) => {
  const renderBadgeCards = () => {
    return data.badges.map((badge, index) => (
      <Badge
        key={index}
        icon={renderIcon(badge.icon, badge.status, badge.height, badge.width)}
        status={badge.status}
        statusActive={badge.statusActive}
        statusInactive={badge.statusInactive}
        title={badge.title}
      />
    ));
  };

  const groupedBadgeCards = () => {
    const badgeCards = renderBadgeCards();
    const groupedCards: JSX.Element[][] = [];

    for (let i = 0; i < badgeCards.length; i += 6) {
      groupedCards.push(badgeCards.slice(i, i + 6));
    }

    return groupedCards;
  };

  return (
    <div
      className="flex flex-col items-start gap-[15px] w-full"
      style={override}
    >
      <p className="text-white text-[21px] font-bold">Favorite Badges</p>
      <div className="flex flex-col items-start gap-2 w-full h-auto">
        {groupedBadgeCards().map((group, i) => (
          <div className="flex flex-wrap items-start gap-[15px]" key={i}>
            {group}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteBadges;
