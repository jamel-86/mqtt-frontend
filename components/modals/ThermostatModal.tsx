import React, { useState } from "react";
import Modal from "react-modal";
import { Thermostat } from "react-thermostat";
import { Icon } from "@iconify/react";
import "tailwindcss/tailwind.css";
import { useTheme } from "next-themes";

const ThermostatComponent = () => {
  const [temp, setTemp] = useState(22);
  const [colors, setColors] = useState(["#cfac48", "#cd5401"]);
  const [state, setState] = useState("heat");
  const [fanMode, setFanMode] = useState("High");
  const currentTempColor = state === "off" ? "white" : colors[1];
  const on = state !== "off";

  const { theme } = useTheme();

  const iconColor = theme === "dark" ? "white" : "black";

  const fanModes = ["Low", "Mid", "High"];
  const spin = "animate-spin";

  const FanIcon = ({ speed }: any) => (
    <Icon
      className={speed ? `${spin}` : ""}
      icon="mdi:fan"
      width="40" // Adjust the size as needed
      height="40" // Adjust the size as needed
      style={{
        animationDuration:
          speed === "Low"
            ? "7s"
            : speed === "Mid"
              ? "4s"
              : speed === "High"
                ? "2s"
                : "0s",
      }}
    />
  );

  const getIconColor = (state: any, theme: any) => {
    if (state === "heat") {
      return "#cd5401";
    } else if (state === "cool") {
      return "#2c8e98";
    } else if (state === "dry") {
      return "#ffc0bd";
    }
    return theme === "dark" ? "white" : "black";
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg">
      {" "}
      {/* Increased max-width */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg h-[70%] bg-gradient-to-b bg-[rgb(11,15,25)] rounded-2xl p-4">
        {" "}
        {/* Adjusted height */}
        <div
          className={`absolute top-20 left-20 transform -translate-x-1/2`}
          style={{ color: currentTempColor }}
        >
          <span className="text-4xl font-thin">{temp}°</span>{" "}
          {/* Adjusted font size */}
          <span className="block text-lg">TEMPERATURE</span>{" "}
          {/* Adjusted font size */}
          <div className="absolute top-28">
            <button
              className={`rounded-full p-2 w-16 h-16 border-3 ${on ? `border-[#2c8e98]` : "border-gray-500"}`}
              onClick={() => {
                const currentIndex = fanModes.findIndex(
                  (mode) => mode === fanMode
                );
                setFanMode(
                  fanModes[currentIndex + 1]
                    ? fanModes[currentIndex + 1]
                    : fanModes[0]
                );
              }}
            >
              <FanIcon speed={on ? fanMode : undefined} />
            </button>
          </div>
        </div>
        <div className="absolute top-24 right-8 flex flex-col gap-4 z-10">
          {" "}
          {/* Adjusted positioning */}
          <button
            className={`rounded-full p-3 border-2 ${state === "heat" ? "border-[#2c8e98]" : "border-gray-500"}`}
            onClick={() => {
              setState("heat");
              setColors(["#cfac48", "#cd5401"]);
            }}
          >
            <Icon
              icon="material-symbols:mode-heat"
              style={{ color: getIconColor("heat", theme) }}
            />
          </button>
          <button
            className={`rounded-full p-3 border-2 ${state === "dry" ? "border-[#2c8e98]" : "border-gray-500"}`}
            onClick={() => {
              setState("dry");
              setColors(["#fff", "#ffc0bd"]);
            }}
          >
            <Icon
              icon="material-symbols:cool-to-dry-outline"
              style={{ color: getIconColor("dry", theme) }}
            />
          </button>
          <button
            className={`rounded-full p-3 border-2 ${state === "cool" ? "border-[#2c8e98]" : "border-gray-500"}`}
            onClick={() => {
              setState("cool");
              setColors(["#dae8eb", "#2c8e98"]);
            }}
          >
            <Icon
              icon="ic:baseline-ac-unit"
              style={{ color: getIconColor("cool", theme) }}
            />
          </button>
        </div>
        <div className="flex justify-center items-center w-full mt-22">
          {" "}
          {/* Adjusted margin */}
          <Thermostat
            min={18}
            max={30}
            defaultChecked={on}
            disabled={!on}
            value={temp}
            valueSuffix={"°C"}
            track={{
              colors,
            }}
            onChange={(newTemp) => {
              setTemp(Number(newTemp.toFixed(0)));
            }}
            style={{ transform: "scale(.6)" }} // Adjust the scale as needed
          />
          <button
            className={`absolute bottom-2 p-6 rounded-full border-2 ${on ? "border-yellow-500" : "border-gray-500"}`}
            onClick={() => {
              setState(state === "off" ? "cool" : "off");
              setColors(
                state === "off"
                  ? ["#cfac48", "#cd5401"]
                  : ["#848484", "#383838"]
              );
            }}
          >
            <Icon icon="ic:round-power-settings-new" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ThermostatModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ThermostatModal = ({ isOpen, onRequestClose }: ThermostatModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Thermostat Modal"
      className="bg-[rgb(11,15,25)] rounded-[35px] shadow-lg p-6 max-w-xl w-[70%] mx-auto my-20 flex justify-center items-center relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Thermostat Control
        </h2>{" "}
        <ThermostatComponent />
      </div>
    </Modal>
  );
};

export default ThermostatModal;
