"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { FC, ReactElement, useRef, useEffect } from "react";
import { TRevealProps } from "./type";

export const Reveal: FC<TRevealProps> = ({ children, w = "w-fit", blur = false }): ReactElement => {
  const ref = useRef(null);
  const isViewed = useInView(ref, { once: true });
  const animateControllers = useAnimation();

  useEffect(() => {
    if (isViewed) {
      animateControllers.start("visible");
    }
  }, [animateControllers, isViewed]);
  return (
    <div ref={ref} className={`relative ${w} overflow-hidden ${blur ? "backdrop-blur-sm" : ""} `}>
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
    </div>
  );
};
