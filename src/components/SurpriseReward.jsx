import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SURPRISE_REWARDS } from '../utils/engagementSystem';

/**
 * SurpriseReward Component - Displays varied visual rewards
 * Creates 30% surprise moments with treasure chests, balloons, bubbles, etc.
 */
const SurpriseReward = ({ rewardType, isActive = true, onComplete = () => {} }) => {
  const [particles, setParticles] = useState([]);
  const [showReward, setShowReward] = useState(!!rewardType);

  useEffect(() => {
    if (!isActive || !rewardType) return;

    switch (rewardType) {
      case SURPRISE_REWARDS.TREASURE_CHEST:
        triggerTreasureChest();
        break;
      case SURPRISE_REWARDS.MASCOT_DANCE:
        triggerMascotDance();
        break;
      case SURPRISE_REWARDS.FLOATING_BALLOONS:
        triggerBalloons();
        break;
      case SURPRISE_REWARDS.BUBBLES_POP:
        triggerBubbles();
        break;
      case SURPRISE_REWARDS.CONFETTI_BURST:
        triggerConfetti();
        break;
    }

    const timer = setTimeout(() => {
      setShowReward(false);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [rewardType, isActive]);

  const triggerTreasureChest = () => {
    // Create treasure particles
    const newParticles = Array(15).fill(null).map((_, i) => ({
      id: i,
      emoji: ['💎', '💰', '👑', '🏆'][Math.floor(Math.random() * 4)],
      x: Math.random() * 200 - 100,
      y: Math.random() * 100 - 50,
      delay: i * 0.05
    }));
    setParticles(newParticles);

    // Play treasure chest sound (optional)
    const utterance = new SpeechSynthesisUtterance('Trésor trouvé!');
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  };

  const triggerMascotDance = () => {
    const newParticles = Array(8).fill(null).map((_, i) => ({
      id: i,
      emoji: '🎵',
      x: (i - 4) * 50,
      y: -30,
      delay: i * 0.1
    }));
    setParticles(newParticles);

    const utterance = new SpeechSynthesisUtterance('Danse avec moi!');
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  };

  const triggerBalloons = () => {
    const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9CA24', '#FF9FF3'];
    const newParticles = Array(8).fill(null).map((_, i) => ({
      id: i,
      emoji: '🎈',
      color: balloonColors[i % balloonColors.length],
      x: (i - 4) * 60,
      y: 0,
      delay: i * 0.1
    }));
    setParticles(newParticles);

    const utterance = new SpeechSynthesisUtterance('Ballons!');
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  };

  const triggerBubbles = () => {
    const bubbleCount = 20;
    const newParticles = Array(bubbleCount).fill(null).map((_, i) => ({
      id: i,
      emoji: '🫧',
      x: Math.random() * 300 - 150,
      y: Math.random() * 200,
      delay: i * 0.05,
      size: 'sm'
    }));
    setParticles(newParticles);

    const utterance = new SpeechSynthesisUtterance('Pop pop pop!');
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    });

    const utterance = new SpeechSynthesisUtterance('Bravo!');
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  };

  return (
    <AnimatePresence>
      {showReward && (
        <motion.div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          {/* Treasure Chest */}
          {rewardType === SURPRISE_REWARDS.TREASURE_CHEST && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="text-8xl"
            >
              🏴‍☠️
            </motion.div>
          )}

          {/* Particles */}
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: particle.x,
                y: particle.y,
                scale: 1,
                opacity: 0
              }}
              transition={{
                duration: 2,
                delay: particle.delay,
                ease: 'easeOut'
              }}
              className={`absolute text-${particle.size || 'base'}`}
              style={{
                fontSize: particle.size === 'sm' ? '1.5rem' : '2rem'
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}

          {/* Center glow effect */}
          <motion.div
            className="absolute w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full blur-3xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SurpriseReward;
