import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  getMascotMessage,
  getMascotEmote,
  MASCOT_ACTIONS,
  getRandomAction
} from '../utils/engagementSystem';
import { BearMascot, CatMascot, RabbitMascot, DogMascot, LionMascot } from './CustomMascots';

/**
 * Mascot Component - A character that reacts to user actions
 * Makes the learning experience feel alive and emotional
 */
const Mascot = ({ 
  size = 'md',
  reaction = 'CHEERING',
  isActive = true,
  onActionComplete = () => {},
  autoAnimate = false,
  type = 'bear' // bear, cat, rabbit, dog, lion
}) => {
  const [message, setMessage] = useState('');
  const [currentAction, setCurrentAction] = useState(null);
  const [mood, setMood] = useState('happy');
  const [showMessage, setShowMessage] = useState(false);

  // Auto-trigger actions every 5-8 seconds
  useEffect(() => {
    if (!autoAnimate || !isActive) return;

    const interval = setInterval(() => {
      const action = getRandomAction();
      triggerAction(action);
    }, 5000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [autoAnimate, isActive]);

  const triggerAction = (action) => {
    setCurrentAction(action);
    setTimeout(() => {
      setCurrentAction(null);
      onActionComplete();
    }, action.duration);
  };

  const showReaction = (reactionType) => {
    const msg = getMascotMessage(reactionType);
    
    // Map reaction types to moods
    const moodMap = {
      'SUCCESS': 'excited',
      'INCORRECT': 'sad',
      'FUNNY_MISTAKE': 'confused',
      'CHEERING': 'happy'
    };
    
    setMessage(msg);
    setMood(moodMap[reactionType] || 'happy');
    setShowMessage(true);

    // Auto-dismiss message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
      setMood('happy');
    }, 3000);
  };

  // Size configurations for SVG mascots
  const sizeConfig = {
    sm: { width: 60, messageSize: 'text-sm' },
    md: { width: 100, messageSize: 'text-base' },
    lg: { width: 140, messageSize: 'text-lg' },
    xl: { width: 180, messageSize: 'text-xl' }
  };

  const config = sizeConfig[size] || sizeConfig.md;

  // Map mascot types to components
  const mascotComponents = {
    bear: BearMascot,
    cat: CatMascot,
    rabbit: RabbitMascot,
    dog: DogMascot,
    lion: LionMascot
  };

  const MascotComponent = mascotComponents[type] || BearMascot;

  // Animation variants for different actions
  const actionVariants = {
    dance: {
      animate: {
        rotate: [0, -10, 10, -10, 0],
        y: [0, -20, 0, -20, 0],
      },
      transition: { duration: 2, repeat: 1 }
    },
    jump: {
      animate: {
        y: [0, -50, 0],
      },
      transition: { duration: 0.8 }
    },
    spin: {
      animate: {
        rotate: [0, 360],
      },
      transition: { duration: 1.5 }
    },
    laugh: {
      animate: {
        scale: [1, 1.1, 1, 1.1, 1],
      },
      transition: { duration: 1.5 }
    },
    shake: {
      animate: {
        x: [0, -10, 10, -10, 0],
      },
      transition: { duration: 0.6 }
    }
  };

  const getActionVariant = () => {
    if (!currentAction) return { animate: {} };
    return actionVariants[currentAction.name] || { animate: {} };
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Mascot Character */}
      <motion.div
        className="flex items-center justify-center cursor-pointer select-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => showReaction('CHEERING')}
        {...getActionVariant()}
      >
        <MascotComponent 
          size={config.width} 
          mood={mood}
          isAnimating={currentAction !== null}
        />
      </motion.div>

      {/* Message bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute top-full mt-3 bg-white rounded-2xl shadow-xl p-3 px-4 border-2 border-blue-200 whitespace-nowrap"
          >
            <p className={`${config.messageSize} font-bold text-gray-800 leading-tight`}>
              {message}
            </p>
            {/* Message bubble pointer */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-blue-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mascot;
