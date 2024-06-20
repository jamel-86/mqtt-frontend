import React from "react";

interface GenericBadgeProps {
  title: string;
  status: number;
  statusActive: string;
  statusInactive: string;
  icon: React.ReactNode; // Pass the icon component directly
}

export default function Badge({
  title,
  status,
  statusActive,
  statusInactive,
  icon,
}: GenericBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-[7px]">
      <div className="flex flex-col justify-center items-center w-[65px] h-[65px] bg-white rounded-[50%]">
        {icon}
      </div>
      <div className="flex justify-center items-center">
        <p className="text-xs leading-[0.875rem] text-center">
          {title}
          <br />
          <span
            className={`block mt-1 ${
              status === 1 ? "text-[rgb(67,198,178)]" : ""
            }`}
          >
            {status === 1 ? statusActive : statusInactive}
          </span>
        </p>
      </div>
    </div>
  );
}
