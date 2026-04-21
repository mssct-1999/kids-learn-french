/**
 * Engagement System - Manages surprise rewards, mascot interactions, and varied gameplay
 */

// Surprise reward types (30% trigger rate)
export const SURPRISE_REWARDS = {
  TREASURE_CHEST: 'treasure_chest',
  MASCOT_DANCE: 'mascot_dance',
  FLOATING_BALLOONS: 'floating_balloons',
  BUBBLES_POP: 'bubbles_pop',
  CONFETTI_BURST: 'confetti_burst'
};

// Mascot personality traits and reactions
export const MASCOT_REACTIONS = {
  SUCCESS: {
    messages: [
      "Bravo! Tu es incroyable! 🌟",
      "Yes! Tu l'as trouvé! 🎉",
      "Parfait! Tu es un champion! 👑",
      "Super! J'adore ça! 💖",
      "Waouh! C'est magnifique! ✨"
    ],
    emotes: ['😄', '🥳', '😍', '🤩', '👏']
  },
  INCORRECT: {
    messages: [
      "Oups! Ce n'est pas ça... 😅",
      "Essaie encore! Tu vas réussir! 💪",
      "Hmm, ce n'était pas bon... mais tu vas trouver! 🤔",
      "Oh non! Mais on réessaie? 😜",
      "Haha! Même moi je me trompe parfois! 🙈"
    ],
    emotes: ['😅', '😌', '🤔', '😜', '🙈']
  },
  FUNNY_MISTAKE: {
    messages: [
      "Attends... c'est un chat ou une vache? 😜",
      "Oops! Je me suis trompé moi aussi! 😂",
      "Hahahaha! C'est drôle non? 🤣",
      "Oh non! Je suis bête parfois! 🙃",
      "Est-ce que les poissons volent? 🤨"
    ],
    emotes: ['😂', '🤣', '🙃', '😜', '🤨']
  },
  CHEERING: {
    messages: [
      "Allez! Allez! Tu peux le faire! 🚀",
      "Encore un! Je crois en toi! 💪",
      "Vas-y! Tu es trop fort! ⚡",
      "Come on! On va gagner! 🏆",
      "Tu es ma super star! ⭐"
    ],
    emotes: ['🚀', '💪', '⚡', '🏆', '⭐']
  }
};

// Mascot silly actions
export const MASCOT_ACTIONS = {
  DANCE: {
    name: 'dance',
    duration: 2000,
    description: 'Danse joyeuse'
  },
  JUMP: {
    name: 'jump',
    duration: 800,
    description: 'Saute de joie'
  },
  SPIN: {
    name: 'spin',
    duration: 1500,
    description: 'Tourne sur lui-même'
  },
  LAUGH: {
    name: 'laugh',
    duration: 1500,
    description: 'Rit aux éclats'
  },
  SHAKE: {
    name: 'shake',
    duration: 600,
    description: 'Se secoue'
  }
};

// Get random surprise reward (70% normal, 30% surprise)
export const getRewardType = () => {
  const random = Math.random();
  if (random > 0.7) {
    const rewards = Object.values(SURPRISE_REWARDS);
    return rewards[Math.floor(Math.random() * rewards.length)];
  }
  return null;
};

// Get random mascot message
export const getMascotMessage = (reactionType = 'SUCCESS') => {
  const messages = MASCOT_REACTIONS[reactionType]?.messages || MASCOT_REACTIONS.SUCCESS.messages;
  return messages[Math.floor(Math.random() * messages.length)];
};

// Get random mascot emote
export const getMascotEmote = (reactionType = 'SUCCESS') => {
  const emotes = MASCOT_REACTIONS[reactionType]?.emotes || MASCOT_REACTIONS.SUCCESS.emotes;
  return emotes[Math.floor(Math.random() * emotes.length)];
};

// Get random mascot action
export const getRandomAction = () => {
  const actions = Object.values(MASCOT_ACTIONS);
  return actions[Math.floor(Math.random() * actions.length)];
};

// Mini-game types with varied mechanics
export const MINIGAME_TYPES = {
  MEMORY: 'memory',
  DRAG_DROP: 'drag_drop',
  QUICK_TAP: 'quick_tap',
  LISTEN_CHOOSE: 'listen_choose',
  BUBBLE_POP: 'bubble_pop',
  CATCH_MASCOT: 'catch_mascot',
  SOUND_IMITATE: 'sound_imitate',
  WORD_SORT: 'word_sort'
};

// Rotation system for varied gameplay
export class GameRotationSystem {
  constructor(gameTypes = Object.values(MINIGAME_TYPES)) {
    this.gameTypes = gameTypes;
    this.currentIndex = 0;
    this.history = [];
  }

  getNextGame() {
    const game = this.gameTypes[this.currentIndex];
    this.history.push(game);
    this.currentIndex = (this.currentIndex + 1) % this.gameTypes.length;
    return game;
  }

  getCurrentGame() {
    return this.gameTypes[this.currentIndex];
  }

  resetRotation() {
    this.currentIndex = 0;
    this.history = [];
  }
}

// Calculate engagement score (for rewards, streaks, etc)
export const calculateEngagementScore = (stats) => {
  let score = 0;
  
  // Correct answers boost score
  score += (stats.correctAnswers || 0) * 10;
  
  // Time spent bonus (2 points per minute, max 100)
  score += Math.min((stats.timeSpentSeconds || 0) / 30, 100);
  
  // Streak multiplier
  score *= (1 + (stats.streak || 0) * 0.1);
  
  // Variety bonus (different game types)
  score += (stats.gamesPlayed || new Set(stats.gameTypes || []).size) * 5;
  
  return Math.floor(score);
};

// Interactive element cooldown system
export class InteractionCooldown {
  constructor(intervalMs = 4000) {
    this.intervalMs = intervalMs;
    this.lastInteraction = 0;
  }

  canInteract() {
    const now = Date.now();
    if (now - this.lastInteraction >= this.intervalMs) {
      this.lastInteraction = now;
      return true;
    }
    return false;
  }

  reset() {
    this.lastInteraction = 0;
  }
}
