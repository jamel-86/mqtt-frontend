import { SVGProps } from "react";
import { IThermostat } from "./thermostat";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TThermostat = IThermostat;