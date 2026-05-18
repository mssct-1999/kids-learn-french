const speak = (message, options = {}) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = options.lang || 'fr-FR';
  utterance.rate = options.rate || 0.85;
  window.speechSynthesis.speak(utterance);
};

export const playAudio = (word) => {
  // Placeholder ready for future files: /audio/chien.mp3, /audio/rouge.mp3, etc.
  if (typeof Audio !== 'undefined') {
    const audio = new Audio(`/audio/${word.toLowerCase().replace(/\s+/g, '_')}.mp3`);
    audio.oncanplaythrough = () => audio.play();
    audio.onerror = () => speak(word, { rate: 0.75 });
    audio.load();
    return;
  }

  speak(word, { rate: 0.75 });
};

export const playSuccessSound = () => {
  // Placeholder for a future chime or success MP3.
  speak('Bravo !', { rate: 0.9 });
};

export const playMascotVoice = (message) => {
  // Placeholder for mascot voice recordings.
  speak(message, { rate: 0.9 });
};
