import { motion, useInView, useAnimation } from 'framer-motion';
import { FC, ReactElement, useRef, useEffect } from 'react';
import { TRevealProps } from './type';

export const Reveal: FC<TRevealProps> = ({
  children,
  w = 'fit',
  variantX = false,
  variantY = true,
  initial = 'hidden',
  duration = 0.5,
  delay = 0.25,
  customX = -100,
  customY = 75,
}): ReactElement => {
  const ref = useRef(null);
  const isViewed = useInView(ref, { once: true });
  const animateControllers = useAnimation();

  useEffect(() => {
    if (isViewed) {
      animateControllers.start('visible');
    }
  }, [animateControllers, isViewed]);

  const variants = {
    hidden: {
      opacity: 0,
      x: variantX ? customX : 0,
      y: variantY ? customY : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <div ref={ref} className={`relative ${w} overflow-hidden`}>
      <motion.div
        variants={variants}
        initial={initial}
        animate={animateControllers}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
