import * as React from "react";

import FavoriteAccessories from "../FavoriteAccessories";
import ThermostatModal from "../modals/ThermostatModal";
import DimmerModal from "../modals/DimmerModal";

import { SmartHomeIcon } from "@/components/common/icons";
import FavoriteScenes from "@/components/FavoriteScenes";
import FavoriteBadges from "@/components/FavoriteBadges";

const HomeScreen = ({ override }: { override?: React.CSSProperties }) => {
  const [isThermostatModalOpen, setIsThermostatModalOpen] =
    React.useState(false);
  const [isDimmerModalOpen, setIsDimmerModalOpen] = React.useState(false);
  const [currentAccessoryName, setCurrentAccessoryName] = React.useState("");

  const openThermostatModal = (name: string) => {
    setCurrentAccessoryName(name);
    setIsThermostatModalOpen(true);
  };
  const closeThermostatModal = () => setIsThermostatModalOpen(false);

  const openDimmerModal = (name: string) => {
    setCurrentAccessoryName(name);
    setIsDimmerModalOpen(true);
  };
  const closeDimmerModal = () => setIsDimmerModalOpen(false);

  return (
    <div
      className="flex flex-col justify-center items-start gap-[26px] w-full px-2"
      style={override}
    >
      <div className="relative w-[120px] h-[21px] flex items-center">
        <div className="flex-shrink-0">
          <SmartHomeIcon />
        </div>
        <div className="relative w-5 h-5 ml-4 group">
          {/* Faded box on hover */}
          <div className="absolute inset-0 bg-gray-500 opacity-0 group-hover:opacity-50 transition-opacity" />
          <div className="absolute w-0.5 h-full bg-white left-1/2 transform -translate-x-1/2" />
          <div className="absolute h-0.5 w-full bg-white top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-start gap-3">
        <p className="text-white text-[28px] font-bold">Smart Home</p>
        <div className="flex items-start gap-[15px]">
          <FavoriteBadges />
        </div>
      </div>

      <FavoriteScenes />

      <FavoriteAccessories
        onLightLongPress={openDimmerModal}
        onThermostatLongPress={openThermostatModal}
      />
      <ThermostatModal
        isOpen={isThermostatModalOpen}
        onRequestClose={closeThermostatModal}
      />
      <DimmerModal
        color="#ffc107"
        initialValue={50}
        isOpen={isDimmerModalOpen}
        name={currentAccessoryName}
        onChange={() => {}}
        onRequestClose={closeDimmerModal}
      />
    </div>
  );
};

export default HomeScreen;
