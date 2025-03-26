
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
}

export const pageTransition = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const itemFadeIn = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 15 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
