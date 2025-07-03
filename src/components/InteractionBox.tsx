"use client";

import { Easing, motion } from "framer-motion";
import styles from "../app/InteractionBox.module.css";
import ShakyImage from "./ShakyImage";
import MarkdownContent from "./MarkdownContent";

interface InteractionBoxProps {
  title: string;
  description: string | null;
  idx: number;
}

const floatUpVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: ["easeIn", "easeOut"] as Easing[] },
  },
};

export function InteractionBox({
  title,
  description,
  idx,
}: InteractionBoxProps) {
  return (
    <div className={styles.boxContent}>
      {idx == 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ShakyImage src="/rabbit.png" alt="rabbit" width="300" height="240" />
        </div>
      )}

      <motion.h2
        variants={floatUpVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={styles.title}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={floatUpVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={styles.desc}
      >
        <MarkdownContent content={description ?? ""} />
      </motion.div>
    </div>
  );
}
