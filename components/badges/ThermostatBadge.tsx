// create a component that will be used in the frontend/components/badges/ThermostatBadge.tsx file
import React from "react";

import { RoundArrowUpIcon } from "@/components/common/icons";
import { HumidityIcon } from "@/components/common/icons";

export default function ThermostatBadge() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-end relative">
          <div className="flex flex-col justify-end items-center gap-[-45px] relative w-[65px] h-[65px]">
            <div className="opacity-20 w-[65px] h-[65px] border-solid border-white border-[0.125rem] rounded-[50%]" />
            <div className="flex justify-center items-start gap-[1px] absolute left-3.5 top-[20.66px]">
              <p className="text-[rgb(247,_122,_12)] text-[21px] font-bold">
                22
              </p>
              <p className="text-[rgb(247,_122,_12)] text-[9px] font-bold">O</p>
            </div>
          </div>
          <div className="flex justify-center items-center absolute left-12 top-[44.66px]">
            <RoundArrowUpIcon height={17} width={17} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-white text-[11px] font-bold">22%</p>
        <div className="w-2 h-3">
          <HumidityIcon />
        </div>
      </div>
    </div>
  );
}
