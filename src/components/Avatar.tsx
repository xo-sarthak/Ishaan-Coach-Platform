import React from "react";

interface AvatarProps {
  initials: string;
  className?: string;
  index?: number;
}

const COLORS = [
  "bg-[#E0F2FE] text-[#0369A1]", // Blue
  "bg-[#F0FDF4] text-[#15803D]", // Green
  "bg-[#FEFCE8] text-[#A16207]", // Yellow
  "bg-[#FAF5FF] text-[#7E22CE]", // Purple
  "bg-[#FFF1F2] text-[#BE123C]", // Rose
  "bg-[#F5F3FF] text-[#4338CA]", // Indigo
];

export function Avatar({ initials, className = "w-8 h-8", index = 0 }: AvatarProps) {
  const colorClass = COLORS[index % COLORS.length];
  
  return (
    <div 
      className={`${className} rounded-full flex items-center justify-center font-bold text-[10px] tracking-tighter border-2 border-white shadow-sm ring-1 ring-black/5 ${colorClass}`}
    >
      {initials.toUpperCase().slice(0, 2)}
    </div>
  );
}
