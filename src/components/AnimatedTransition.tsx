
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTransitionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fade' | 'slide' | 'scale' | 'slideUp';
}

export const pageTransition = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
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

export const slideTransition = {
  hidden: { opacity: 0, x: -30 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: { 
    opacity: 0, 
    x: 30,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export const slideUpTransition = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

export const scaleTransition = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  exit: { 
    opacity: 0, 
    scale: 1.02,
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

const getVariant = (variant: 'fade' | 'slide' | 'scale' | 'slideUp') => {
  switch (variant) {
    case 'slide':
      return slideTransition;
    case 'scale':
      return scaleTransition;
    case 'slideUp':
      return slideUpTransition;
    case 'fade':
    default:
      return pageTransition;
  }
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ 
  children, 
  className = "",
  variant = 'fade',
  ...props
}) => {
  const selectedVariant = getVariant(variant);
  
  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      animate="show"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
