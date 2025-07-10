import React from "react";

interface LabelButtonProps {
  id?: string | number;
  label: string;
  checked: boolean;
  onToggle: (label: string) => void;
  color?: "primary" | "green" | "rose" | "gray";
  size?: "sm" | "md" | "lg";
}

const colorMap = {
  primary: "border-blue-500 text-blue-500",
  green: "border-green-500 text-green-500",
  rose: "border-rose-500 text-rose-500",
  gray: "border-gray-500 text-gray-500",
};

const sizeMap = {
  sm: "text-sm px-3 py-1",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
};

const labelButton =
  "inline-block rounded-full border cursor-pointer select-none transition-colors font-medium m-1";

export default function LabelButton({
  id,
  label,
  checked,
  onToggle,
  color = "primary",
  size = "md",
}: LabelButtonProps) {
  return (
    <div
      key={id}
      onClick={() => onToggle(label)}
      className={`${labelButton}
        ${sizeMap[size]}
        ${checked ? colorMap[color] : colorMap["gray"]}`}
    >
      {label}
    </div>
  );
}
