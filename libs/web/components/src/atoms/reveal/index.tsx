"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { FC, ReactElement, useRef, useEffect, useState } from "react";
import { TRevealProps } from "./type";

export const Reveal: FC<TRevealProps> = ({ children, w = "w-fit", blur = false }): ReactElement => {
  const ref = useRef(null);
  const isViewed = useInView(ref, { once: true });
  const animateControllers = useAnimation();
  const [isWidth, setIsWidth] = useState<number>(0);

  useEffect(() => {
    if (isViewed) {
      animateControllers.start("visible");
    }
  }, [animateControllers, isViewed, isWidth]);

  useEffect(() => {
    const width = window.screen.width;
    console.log(width);
    setIsWidth(width);
  }, []);

  return (
    <div
      data-testid="reveal"
      ref={ref}
      className={`relative ${w} overflow-hidden ${blur ? "backdrop-blur-sm" : ""} `}
    >
      {isWidth > 640 ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={animateControllers}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </div>
  );
};
