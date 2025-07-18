import React from "react";

interface LabelButtonSkeletonProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8 w-16",
  md: "h-10 w-20",
  lg: "h-12 w-24",
};

const baseStyle = "inline-block rounded-full border border-gray-300 bg-gray-200 animate-pulse m-1";

export default function LabelButtonSkeleton({ size = "md" }: LabelButtonSkeletonProps) {
  return <div className={`${baseStyle} ${sizeMap[size]} skeleton`} />;
}
