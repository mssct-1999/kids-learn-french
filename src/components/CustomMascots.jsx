import { motion } from 'framer-motion';

/**
 * Animal Mascots - Custom SVG components for different animal types
 */

// Bear Mascot
export const BearMascot = ({ size = 100, mood = 'happy', isAnimating = false }) => {
  const moodStyles = {
    happy: { eyeY: 45, eyeScale: 1, mouthPath: 'M 40 60 Q 50 68 60 60' },
    sad: { eyeY: 48, eyeScale: 0.8, mouthPath: 'M 40 70 Q 50 62 60 70' },
    excited: { eyeY: 40, eyeScale: 1.2, mouthPath: 'M 40 58 Q 50 70 60 58' },
    confused: { eyeY: 47, eyeScale: 1, mouthPath: 'M 45 65 L 55 65' }
  };

  const style = moodStyles[mood] || moodStyles.happy;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Head */}
      <circle cx="50" cy="50" r="35" fill="#8B6F47" stroke="#654321" strokeWidth="2" />

      {/* Ears */}
      <circle cx="25" cy="20" r="12" fill="#8B6F47" stroke="#654321" strokeWidth="1.5" />
      <circle cx="75" cy="20" r="12" fill="#8B6F47" stroke="#654321" strokeWidth="1.5" />
      <circle cx="25" cy="20" r="8" fill="#D4A574" />
      <circle cx="75" cy="20" r="8" fill="#D4A574" />

      {/* Face background (lighter) */}
      <ellipse cx="50" cy="55" rx="20" ry="22" fill="#D4A574" />

      {/* Snout */}
      <ellipse cx="50" cy="58" rx="14" ry="12" fill="#C9956A" />

      {/* Eyes */}
      <circle cx="38" cy={style.eyeY} r="5" fill="white" />
      <circle cx="62" cy={style.eyeY} r="5" fill="white" />

      {/* Pupils */}
      <motion.circle cx="38" cy={style.eyeY} r="3" fill="#000" />
      <motion.circle cx="62" cy={style.eyeY} r="3" fill="#000" />

      {/* Nose */}
      <ellipse cx="50" cy="60" rx="4" ry="3" fill="#3D2817" />

      {/* Mouth */}
      <path
        d={style.mouthPath}
        stroke="#3D2817"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Rosy cheeks */}
      <circle cx="25" cy="50" r="4" fill="#FFB6C1" opacity="0.6" />
      <circle cx="75" cy="50" r="4" fill="#FFB6C1" opacity="0.6" />
    </motion.svg>
  );
};

// Cat Mascot
export const CatMascot = ({ size = 100, mood = 'happy', isAnimating = false }) => {
  const moodStyles = {
    happy: { eyeY: 42, mouthPath: 'M 50 58 Q 48 62 46 60 M 50 58 Q 52 62 54 60', eyeScale: 1 },
    sad: { eyeY: 45, mouthPath: 'M 46 65 Q 50 60 54 65', eyeScale: 0.8 },
    excited: { eyeY: 38, mouthPath: 'M 48 60 L 52 60', eyeScale: 1.3 },
    confused: { eyeY: 44, mouthPath: 'M 50 62 Q 50 65 50 68', eyeScale: 1 }
  };

  const style = moodStyles[mood] || moodStyles.happy;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Head */}
      <circle cx="50" cy="50" r="32" fill="#FF9F5A" stroke="#E67E22" strokeWidth="2" />

      {/* Left Ear */}
      <polygon
        points="25,20 15,5 30,25"
        fill="#FF9F5A"
        stroke="#E67E22"
        strokeWidth="1.5"
      />
      {/* Left Ear Inner */}
      <polygon points="25,20 20,12 27,22" fill="#FFB3D9" />

      {/* Right Ear */}
      <polygon
        points="75,20 85,5 70,25"
        fill="#FF9F5A"
        stroke="#E67E22"
        strokeWidth="1.5"
      />
      {/* Right Ear Inner */}
      <polygon points="75,20 80,12 73,22" fill="#FFB3D9" />

      {/* Face */}
      <ellipse cx="50" cy="52" rx="22" ry="24" fill="#FFCB99" />

      {/* Eyes */}
      <ellipse cx="40" cy={style.eyeY} rx="5" ry="8" fill="white" />
      <ellipse cx="60" cy={style.eyeY} rx="5" ry="8" fill="white" />

      {/* Pupils (vertical cat pupils) */}
      <ellipse cx="40" cy={style.eyeY} rx="2" ry="5" fill="#000" />
      <ellipse cx="60" cy={style.eyeY} rx="2" ry="5" fill="#000" />

      {/* Nose */}
      <polygon points="50,55 48,60 52,60" fill="#FFB3D9" />

      {/* Mouth */}
      <path
        d={style.mouthPath}
        stroke="#E67E22"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Whiskers */}
      <line x1="20" y1="50" x2="5" y2="48" stroke="#E67E22" strokeWidth="1" />
      <line x1="20" y1="55" x2="5" y2="58" stroke="#E67E22" strokeWidth="1" />
      <line x1="80" y1="50" x2="95" y2="48" stroke="#E67E22" strokeWidth="1" />
      <line x1="80" y1="55" x2="95" y2="58" stroke="#E67E22" strokeWidth="1" />

      {/* Rosy cheeks */}
      <circle cx="22" cy="52" r="3" fill="#FFB3D9" opacity="0.7" />
      <circle cx="78" cy="52" r="3" fill="#FFB3D9" opacity="0.7" />
    </motion.svg>
  );
};

// Rabbit Mascot
export const RabbitMascot = ({ size = 100, mood = 'happy', isAnimating = false }) => {
  const moodStyles = {
    happy: { eyeY: 48, mouthPath: 'M 50 62 L 50 68 M 48 68 L 52 68', eyeScale: 1 },
    sad: { eyeY: 51, mouthPath: 'M 48 70 Q 50 65 52 70', eyeScale: 0.8 },
    excited: { eyeY: 45, mouthPath: 'M 50 60 L 50 70 M 46 70 L 54 70', eyeScale: 1.2 },
    confused: { eyeY: 49, mouthPath: 'M 50 65 Q 48 68 52 65', eyeScale: 1 }
  };

  const style = moodStyles[mood] || moodStyles.happy;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Head */}
      <circle cx="50" cy="55" r="28" fill="#FFF" stroke="#999" strokeWidth="2" />

      {/* Left Ear */}
      <ellipse cx="30" cy="15" rx="10" ry="28" fill="#FFF" stroke="#999" strokeWidth="2" />
      <ellipse cx="30" cy="18" rx="6" ry="24" fill="#FFB3D9" />

      {/* Right Ear */}
      <ellipse cx="70" cy="15" rx="10" ry="28" fill="#FFF" stroke="#999" strokeWidth="2" />
      <ellipse cx="70" cy="18" rx="6" ry="24" fill="#FFB3D9" />

      {/* Face background */}
      <ellipse cx="50" cy="58" rx="18" ry="20" fill="#F5F5F5" />

      {/* Eyes */}
      <circle cx="42" cy={style.eyeY} r="4" fill="white" stroke="#999" strokeWidth="1" />
      <circle cx="58" cy={style.eyeY} r="4" fill="white" stroke="#999" strokeWidth="1" />

      {/* Pupils */}
      <circle cx="42" cy={style.eyeY} r="2.5" fill="#000" />
      <circle cx="58" cy={style.eyeY} r="2.5" fill="#000" />

      {/* Nose */}
      <circle cx="50" cy="62" r="3" fill="#FFB3D9" />

      {/* Mouth */}
      <path
        d={style.mouthPath}
        stroke="#999"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Front paws (optional detail) */}
      <ellipse cx="40" cy="78" rx="5" ry="6" fill="#FFF" stroke="#999" strokeWidth="1" />
      <ellipse cx="60" cy="78" rx="5" ry="6" fill="#FFF" stroke="#999" strokeWidth="1" />
    </motion.svg>
  );
};

// Dog Mascot
export const DogMascot = ({ size = 100, mood = 'happy', isAnimating = false }) => {
  const moodStyles = {
    happy: { eyeY: 45, tongueVisible: true, mouthY: 65, eyeScale: 1 },
    sad: { eyeY: 48, tongueVisible: false, mouthY: 70, eyeScale: 0.8 },
    excited: { eyeY: 42, tongueVisible: true, mouthY: 62, eyeScale: 1.2 },
    confused: { eyeY: 46, tongueVisible: false, mouthY: 68, eyeScale: 1 }
  };

  const style = moodStyles[mood] || moodStyles.happy;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Head */}
      <circle cx="50" cy="50" r="32" fill="#D2691E" stroke="#8B4513" strokeWidth="2" />

      {/* Left Ear */}
      <ellipse cx="28" cy="25" rx="9" ry="18" fill="#8B4513" stroke="#5C2E0F" strokeWidth="1.5" />

      {/* Right Ear */}
      <ellipse cx="72" cy="25" rx="9" ry="18" fill="#8B4513" stroke="#5C2E0F" strokeWidth="1.5" />

      {/* Snout */}
      <ellipse cx="50" cy="58" rx="16" ry="14" fill="#CD853F" />

      {/* Eyes */}
      <circle cx="40" cy={style.eyeY} r="4.5" fill="white" />
      <circle cx="60" cy={style.eyeY} r="4.5" fill="white" />

      {/* Pupils */}
      <circle cx="40" cy={style.eyeY} r="2.5" fill="#000" />
      <circle cx="60" cy={style.eyeY} r="2.5" fill="#000" />

      {/* Nose */}
      <ellipse cx="50" cy="62" rx="5" ry="4" fill="#2F1F0F" />

      {/* Mouth */}
      <path
        d={`M 50 ${style.mouthY} Q 42 ${style.mouthY + 5} 35 ${style.mouthY + 2}`}
        stroke="#2F1F0F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M 50 ${style.mouthY} Q 58 ${style.mouthY + 5} 65 ${style.mouthY + 2}`}
        stroke="#2F1F0F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Tongue */}
      {style.tongueVisible && (
        <ellipse cx="50" cy={style.mouthY + 8} rx="4" ry="5" fill="#FF69B4" />
      )}
    </motion.svg>
  );
};

// Lion Mascot (brave & fun)
export const LionMascot = ({ size = 100, mood = 'happy', isAnimating = false }) => {
  const moodStyles = {
    happy: { eyeY: 45, maneRotate: 0, eyeScale: 1 },
    sad: { eyeY: 48, maneRotate: 0, eyeScale: 0.8 },
    excited: { eyeY: 42, maneRotate: 5, eyeScale: 1.2 },
    confused: { eyeY: 46, maneRotate: -5, eyeScale: 1 }
  };

  const style = moodStyles[mood] || moodStyles.happy;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={isAnimating ? { rotate: [0, style.maneRotate, 0] } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Mane */}
      <circle cx="50" cy="50" r="40" fill="#FFA500" stroke="#FF8C00" strokeWidth="2" />

      {/* Inner mane */}
      <circle cx="50" cy="50" r="35" fill="#FFD700" />

      {/* Head */}
      <circle cx="50" cy="50" r="24" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5" />

      {/* Snout */}
      <ellipse cx="50" cy="56" rx="12" ry="10" fill="#FFED4E" />

      {/* Eyes */}
      <circle cx="42" cy={style.eyeY} r="4" fill="white" stroke="#FF8C00" strokeWidth="1" />
      <circle cx="58" cy={style.eyeY} r="4" fill="white" stroke="#FF8C00" strokeWidth="1" />

      {/* Pupils */}
      <circle cx="42" cy={style.eyeY} r="2.5" fill="#000" />
      <circle cx="58" cy={style.eyeY} r="2.5" fill="#000" />

      {/* Nose */}
      <ellipse cx="50" cy="60" rx="4" ry="3" fill="#FF6347" />

      {/* Mouth */}
      <path d="M 50 62 L 50 68" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" />
      <path d="M 46 65 L 54 65" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
};

// Export all mascots
export const MascotOptions = {
  bear: BearMascot,
  cat: CatMascot,
  rabbit: RabbitMascot,
  dog: DogMascot,
  lion: LionMascot
};

export default { BearMascot, CatMascot, RabbitMascot, DogMascot, LionMascot, MascotOptions };
