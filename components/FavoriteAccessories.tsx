import React, { useState } from "react";

import { AccessoryCard } from "./common/AccessoryCard";
import { Icons } from "./common/icons";

import data from "@/config/items.json";

const renderIcon = (
  iconName: string,
  status: number,
  height: number,
  width: number
) => {
  const IconComponent = Icons[iconName];

  return IconComponent ? (
    <IconComponent height={height} status={status} width={width} />
  ) : null;
};

const ITEMS_PER_PAGE = 14; // 2 rows of 7 items each for larger screens

const FavoriteAccessories = ({
  override,
  onLightLongPress,
  onThermostatLongPress,
}: {
  override?: React.CSSProperties;
  onLightLongPress: (name: string) => void;
  onThermostatLongPress: (name: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.accessories.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const renderCards = () => {
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentItems = data.accessories.slice(start, end);

    return currentItems
      .reduce<JSX.Element[][]>((acc, accessory, index) => {
        if (index % 7 === 0) acc.push([]);
        acc[acc.length - 1].push(
          <AccessoryCard
            key={index}
            activeTitle={accessory.activeTitle}
            controllable={accessory.controllable}
            icon={renderIcon(
              accessory.icon,
              accessory.initialState,
              accessory.height,
              accessory.width
            )}
            inactiveTitle={accessory.inactiveTitle}
            initialState={accessory.initialState}
            name={accessory.name}
            type={accessory.type}
            onClick={
              accessory.type === "light"
                ? onLightLongPress
                : accessory.type === "thermostat"
                  ? onThermostatLongPress
                  : undefined
            }
            onLongPress={
              accessory.type === "thermostat"
                ? onThermostatLongPress
                : accessory.type === "light"
                  ? onLightLongPress
                  : undefined
            }
          />
        );

        return acc;
      }, [])
      .map((group, i) => (
        <div key={i} className="flex flex-wrap items-start gap-2 mt-2">
          {group}
        </div>
      ));
  };

  return (
    <div
      className="flex flex-col justify-center items-start gap-[11px]"
      style={override}
    >
      <p className="text-white text-[21px] font-bold mt-4">
        Favorite Accessories
      </p>
      <div className="flex flex-col items-start gap-1.5">{renderCards()}</div>
      {data.accessories.length > ITEMS_PER_PAGE && (
        <div className="flex justify-between w-full mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={currentPage === 0}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded disabled:opacity-50"
            disabled={currentPage === totalPages - 1}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoriteAccessories;
