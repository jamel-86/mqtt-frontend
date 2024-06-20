/* eslint-disable prettier/prettier */
export interface IThermostat {
  name: string;
  temperature: number;
  mode: "comfort" | "economy" | "standby";
  power: "on" | "off";
  fan: "low" | "medium" | "high";
}
