"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../InteractionBox.module.css";
import { InteractionBox } from "@/components/InteractionBox";
import { BASE_REPO } from "@/constants/contents";
import { Issue } from "../types/api/github";

interface Content {
  no: number;
  title: string;
  description: string | null;
}

export default function PortfolioPage() {
  const [content, setContent] = useState<Content[] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`api/github/${BASE_REPO}/milestones/6`)
      .then((res) => res.json())
      .then((data) =>
        setContent(
          data.data
            .map((d: Issue) => ({
              no: d.number,
              title: d.title,
              description: d.body,
            }))
            .sort((a: Content, b: Content) => a.no - b.no)
        )
      )
      .catch(console.error);
  }, []);

  if (!content) return <p>Loading...</p>;

  function handleNext() {
    setIndex((prev) => (prev + 1 < content!.length ? prev + 1 : prev));
  }

  function handlePrev() {
    setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }

  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className={styles.box}>
      <div className={styles.boxWrapper} style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          {content.map((c, i) =>
            i === index ? (
              <motion.div
                key={i}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              >
                <InteractionBox
                  idx={i}
                  title={c.title}
                  description={c.description}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <div className={styles.nav}>
        <button
          onClick={handlePrev}
          className={styles.nextBtn}
          disabled={index === 0}
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className={styles.nextBtn}
          disabled={index === content.length - 1}
        >
          →
        </button>
      </div>
    </div>
  );
}
