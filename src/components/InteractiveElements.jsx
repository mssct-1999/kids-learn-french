import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * InteractiveElements Component
 * Provides constant physical interaction prompts every 3-5 seconds
 * Catches, pops, taps, and swipes to keep children engaged
 */

// Bubble component
export const PopBubbles = ({ words = [], onBubblePop = () => {}, isActive = true }) => {
  const [bubbles, setBubbles] = useState([]);
  const [popped, setPopped] = useState(new Set());

  useEffect(() => {
    if (!isActive || words.length === 0) return;

    const bubbleList = words.map((word, i) => ({
      id: i,
      word: word.image || word.word,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      size: Math.random() * 40 + 60
    }));
    setBubbles(bubbleList);
  }, [isActive, words]);

  const handlePopBubble = (id) => {
    setPopped(prev => new Set([...prev, id]));
    onBubblePop(id);

    const utterance = new SpeechSynthesisUtterance('Pop! Excellent!');
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  };

  if (!isActive || bubbles.length === 0) return null;

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-100 to-cyan-100 rounded-2xl overflow-hidden border-4 border-blue-300">
      {bubbles.map(bubble => (
        !popped.has(bubble.id) && (
          <motion.button
            key={bubble.id}
            initial={{ scale: 0, x: `${bubble.x}%`, y: `${bubble.y}%` }}
            animate={{
              scale: 1,
              y: [`${bubble.y}%`, `${bubble.y - 20}%`, `${bubble.y}%`]
            }}
            transition={{
              initial: { duration: 0.3 },
              y: { duration: 3 + Math.random() * 2, repeat: Infinity }
            }}
            onClick={() => handlePopBubble(bubble.id)}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-400 flex items-center justify-center text-2xl font-bold text-white"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `calc(${bubble.x}% - ${bubble.size / 2}px)`,
              top: `calc(${bubble.y}% - ${bubble.size / 2}px)`
            }}
          >
            {bubble.word}
          </motion.button>
        )
      ))}
    </div>
  );
};

// Catch the mascot component
export const CatchMascot = ({ mascotEmoji = '🐻', onCatch = () => {}, isActive = true }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [moveInterval, setMoveInterval] = useState(null);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15
      });
    }, 2000);

    setMoveInterval(interval);
    return () => clearInterval(interval);
  }, [isActive]);

  const handleCatch = () => {
    onCatch();
    const utterance = new SpeechSynthesisUtterance('Attrapé! Bien joué!');
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  };

  if (!isActive) return null;

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl overflow-hidden border-4 border-green-300">
      <motion.button
        initial={{ scale: 1 }}
        animate={{ x: `${position.x}%`, y: `${position.y}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCatch}
        className="absolute text-6xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`
        }}
      >
        {mascotEmoji}
      </motion.button>

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 right-2 text-center text-sm font-bold text-green-700">
        ⬇️ Clique pour attraper! ⬇️
      </div>
    </div>
  );
};

// Tap sequence game
export const QuickTapGame = ({ targetCount = 5, onComplete = () => {}, isActive = true }) => {
  const [tapped, setTapped] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleTap = () => {
    const newCount = tapped + 1;
    setTapped(newCount);
    setShowMessage(true);

    if (newCount === targetCount) {
      const utterance = new SpeechSynthesisUtterance('Magnifique! Tu es rapide!');
      utterance.lang = 'fr-FR';
      speechSynthesis.speak(utterance);
      
      setTimeout(() => {
        onComplete();
        setTapped(0);
      }, 1500);
    } else {
      setTimeout(() => setShowMessage(false), 300);
    }
  };

  if (!isActive) return null;

  const progress = (tapped / targetCount) * 100;

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden border-4 border-orange-300 flex flex-col items-center justify-center">
      {/* Progress circle */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white border-4 border-orange-300 flex items-center justify-center">
        <div className="text-2xl font-bold text-orange-600">{tapped}/{targetCount}</div>
      </div>

      {/* Tap button */}
      <motion.button
        onClick={handleTap}
        animate={{
          scale: showMessage ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
        className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-2xl hover:shadow-3xl transition-shadow text-5xl font-bold text-white active:scale-95"
      >
        👆
      </motion.button>

      {/* Message */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-8 text-4xl"
        >
          ⭐
        </motion.div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 text-center text-sm font-bold text-orange-700">
        Clique {targetCount} fois!
      </div>
    </div>
  );
};

// Swipe or drag game
export const DragAndDrop = ({ items = [], onDrop = () => {}, isActive = true }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  if (!isActive || items.length === 0) return null;

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl overflow-hidden border-4 border-indigo-300 p-4">
      {/* Dropzone hint */}
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10 flex items-center justify-center text-6xl pointer-events-none">
        🗑️
      </div>

      <div className="relative h-full flex flex-wrap gap-4 items-center justify-center">
        {items.map((item, i) => (
          <motion.div
            key={i}
            draggable
            onDragStart={() => setDraggedItem(item)}
            whileHover={{ scale: 1.1 }}
            className="cursor-grab active:cursor-grabbing bg-white rounded-xl p-3 shadow-lg border-2 border-indigo-300 text-2xl font-bold"
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 right-2 text-center text-xs font-bold text-indigo-700">
        📌 Glisse les mots!
      </div>
    </div>
  );
};

export default {
  PopBubbles,
  CatchMascot,
  QuickTapGame,
  DragAndDrop
};
