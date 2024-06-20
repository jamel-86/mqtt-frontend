import React from "react";

interface Scene {
  icon: React.ReactNode;
  title: string;
  status: number;
}

function SceneCard({ icon, title, status }: Scene) {
  return (
    <div
      className={`${
        status === 0
          ? "flex flex-col justify-center items-start px-[15px] py-[17px] rounded-[13px] bg-[rgba(255,_255,_255,_0.1)]"
          : "flex flex-col justify-center items-start px-[15px] py-[17px] rounded-[13px] bg-white"
      }`}
    >
      <div className="flex items-center gap-2.5 w-[228px]">
        {icon}
        <p
          className={`${
            status === 0
              ? "text-[rgba(255,_255,_255,_0.2)] text-lg font-bold leading-[19px]"
              : "text-black text-lg font-bold leading-[19px]"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export default SceneCard;
