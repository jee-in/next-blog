"use client";
import { motion } from "framer-motion";

interface ShakyImageProps {
  src: string;
  alt: string;
  width: string;
  height: string;
}

export default function ShakyImage({
  src,
  alt,
  width,
  height,
}: ShakyImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      width={width}
      height={height}
      animate={{
        rotate: [0, 2, -2, 2, -2, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut",
      }}
      style={{ display: "block" }}
    />
  );
}
