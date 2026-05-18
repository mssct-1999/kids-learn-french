import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SURPRISE_REWARDS } from '../utils/engagementSystem';
import { playMascotVoice } from '../utils/audio';

const REWARD_LABELS = {
  [SURPRISE_REWARDS.STARS]: 'Etoiles !',
  [SURPRISE_REWARDS.TREASURE_CHEST]: 'Coffre magique !',
  [SURPRISE_REWARDS.MASCOT_DANCE]: 'Danse !',
  [SURPRISE_REWARDS.FLOATING_BALLOONS]: 'Ballons !',
  [SURPRISE_REWARDS.BUBBLES_POP]: 'Bulles !',
  [SURPRISE_REWARDS.CONFETTI_BURST]: 'Bravo !'
};

const particleSets = {
  [SURPRISE_REWARDS.STARS]: ['⭐', '🌟', '✨'],
  [SURPRISE_REWARDS.TREASURE_CHEST]: ['💎', '🪙', '⭐', '🏆'],
  [SURPRISE_REWARDS.MASCOT_DANCE]: ['🎵', '⭐', '🎶'],
  [SURPRISE_REWARDS.FLOATING_BALLOONS]: ['🎈', '🎈', '🎈'],
  [SURPRISE_REWARDS.BUBBLES_POP]: ['🫧', '🫧', '🫧']
};

const SurpriseReward = ({ rewardType, isActive = true, onComplete = () => {} }) => {
  const [particles, setParticles] = useState([]);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    if (!isActive || !rewardType) return;

    setShowReward(true);

    if (rewardType === SURPRISE_REWARDS.CONFETTI_BURST) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff8fab', '#8ecae6', '#ffd166', '#95d5b2', '#b8c0ff']
      });
    } else {
      const emojis = particleSets[rewardType] || particleSets[SURPRISE_REWARDS.STARS];
      setParticles(Array.from({ length: rewardType === SURPRISE_REWARDS.BUBBLES_POP ? 20 : 14 }, (_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length],
        x: Math.random() * 300 - 150,
        y: Math.random() * 220 - 120,
        delay: i * 0.04
      })));
    }

    playMascotVoice(REWARD_LABELS[rewardType] || 'Bravo !');

    const timer = setTimeout(() => {
      setShowReward(false);
      setParticles([]);
      onComplete();
    }, 2400);

    return () => clearTimeout(timer);
  }, [rewardType, isActive, onComplete]);

  const centerEmoji = {
    [SURPRISE_REWARDS.TREASURE_CHEST]: '🎁',
    [SURPRISE_REWARDS.MASCOT_DANCE]: '🐻',
    [SURPRISE_REWARDS.FLOATING_BALLOONS]: '🎈',
    [SURPRISE_REWARDS.BUBBLES_POP]: '🫧',
    [SURPRISE_REWARDS.STARS]: '⭐',
    [SURPRISE_REWARDS.CONFETTI_BURST]: '🎉'
  }[rewardType];

  return (
    <AnimatePresence>
      {showReward && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute h-40 w-40 rounded-full bg-yellow-200 blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.8, 1.15, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{
              scale: 1,
              rotate: rewardType === SURPRISE_REWARDS.MASCOT_DANCE ? [0, -12, 12, -12, 0] : 0,
              y: rewardType === SURPRISE_REWARDS.FLOATING_BALLOONS ? [30, -60] : 0
            }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="relative z-10 text-8xl"
          >
            {centerEmoji}
          </motion.div>

          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-3xl"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: particle.x, y: particle.y, scale: [0, 1, 0.7], opacity: 0 }}
              transition={{ duration: 2, delay: particle.delay, ease: 'easeOut' }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SurpriseReward;
