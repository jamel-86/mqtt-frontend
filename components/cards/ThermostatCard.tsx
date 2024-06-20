export default function ThermostatCard() {
  return (
    <div className="flex flex-col justify-center items-center rounded-[15px] w-[129px] bg-white">
      <div className="flex flex-col justify-center items-start gap-3 px-3 w-[129px] h-[131px]">
        <div className="flex flex-col justify-end items-end gap-[-24px] relative w-8 h-8">
          <div className="w-8 h-8 bg-[rgb(255,_157,_13)] rounded-[50%]" />
          <div className="flex items-center gap-[-1px] absolute w-[24px] h-8">
            <p className="text-white text-xs font-bold">22°</p>
          </div>
        </div>
        <p className="w-[105px] text-black text-sm font-bold">
          Living Room Thermostat
        </p>
        <div className="flex items-start gap-[1px] w-[100px] h-[17px]">
          <p className="text-[rgb(108,_192,_133)] text-sm font-bold">
            Heating to 22
          </p>
          <p className="text-[rgb(143,_143,_145)] text-[9px] font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
