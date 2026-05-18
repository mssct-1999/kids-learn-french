import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';
import SurpriseReward from '../components/SurpriseReward';
import { childName } from '../data/childProfile';
import { lessons } from '../data/lessons';
import { getRandomReward } from '../utils/engagementSystem';
import { playAudio, playMascotVoice, playSuccessSound } from '../utils/audio';

const encouragements = [
  `Essaie encore ${childName} !`,
  'Tu peux le faire !',
  'Oups, aide-moi !'
];

const successMessages = [
  `Bravo ${childName} !`,
  `Super ${childName} !`,
  `Oui ${childName}, c'est ca !`
];

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
const getMiniGameChoices = (words, targetWord, maxChoices = 6) => {
  const distractors = shuffle(words.filter((word) => word.fr !== targetWord.fr)).slice(0, maxChoices - 1);
  return shuffle([targetWord, ...distractors]);
};

const Game = () => {
  const navigate = useNavigate();
  const [lessonIndex, setLessonIndex] = useState(() => {
    const savedIndex = parseInt(localStorage.getItem('kidsFrenchNextLesson') || '0', 10);
    return Number.isNaN(savedIndex) ? 0 : savedIndex % lessons.length;
  });
  const [phase, setPhase] = useState('world');
  const [wordIndex, setWordIndex] = useState(0);
  const [mascotState, setMascotState] = useState('idle');
  const [mascotMessage, setMascotMessage] = useState(`Bonjour ${childName} !`);
  const [feedback, setFeedback] = useState('');
  const [activeReward, setActiveReward] = useState(null);
  const [draggedWord, setDraggedWord] = useState(null);

  const lesson = lessons[lessonIndex];
  const currentWord = lesson.words[wordIndex];
  const targetWord = lesson.words[0];
  const wordCount = lesson.words.length;

  const choices = useMemo(() => getMiniGameChoices(lesson.words, targetWord), [lesson, targetWord]);
  const bubbleChoices = choices;

  useEffect(() => {
    const timer = setTimeout(() => {
      const help = `${childName}, aide-moi a trouver ${targetWord.fr} !`;
      setMascotState('surprised');
      setMascotMessage(help);
      playMascotVoice(help);
    }, 5000);

    return () => clearTimeout(timer);
  }, [phase, wordIndex, targetWord.fr]);

  const setPositiveFeedback = (message = successMessages[Math.floor(Math.random() * successMessages.length)]) => {
    setFeedback(message);
    setMascotMessage(message);
    setMascotState(Math.random() > 0.5 ? 'happy' : 'dancing');
    playSuccessSound();
    setActiveReward(getRandomReward());
  };

  const setTryAgainFeedback = () => {
    const message = encouragements[Math.floor(Math.random() * encouragements.length)];
    setFeedback(message);
    setMascotMessage(message);
    setMascotState('wrong');
    playMascotVoice(message);
    setTimeout(() => {
      setFeedback('');
      setMascotState('idle');
    }, 1600);
  };

  const startWords = () => {
    const message = `${childName}, ecoute ${wordCount} mots !`;
    setWordIndex(0);
    setFeedback('');
    setPhase('words');
    setMascotMessage(message);
    playMascotVoice(message);
  };

  const nextWord = () => {
    setFeedback('');
    if (wordIndex < lesson.words.length - 1) {
      setWordIndex((index) => index + 1);
      setMascotState('idle');
      return;
    }

    const message = getGameInstruction();
    setPhase('minigame');
    setMascotMessage(message);
    playMascotVoice(message);
  };

  const getGameInstruction = () => {
    if (lesson.gameType === 'dragObject') return `${childName}, donne la ${targetWord.fr} a l'ours !`;
    if (lesson.gameType === 'wordBubbles') return `${childName}, eclate ${targetWord.fr} !`;
    return `${childName}, aide-moi a trouver le ${targetWord.fr} !`;
  };

  const completeMiniGame = () => {
    setPositiveFeedback(`Bravo ${childName} !`);
    setTimeout(() => setPhase('reward'), 1600);
  };

  const finishSession = () => {
    const nextLessonIndex = (lessonIndex + 1) % lessons.length;
    localStorage.setItem('kidsFrenchLastPlayed', new Date().toISOString());
    localStorage.setItem('kidsFrenchWordsLearned', String(parseInt(localStorage.getItem('kidsFrenchWordsLearned') || '0') + wordCount));
    localStorage.setItem('kidsFrenchNextLesson', String(nextLessonIndex));
    setPhase('done');
    setMascotState('dancing');
    setMascotMessage(`Bravo ${childName} ! A demain pour une nouvelle aventure !`);
  };

  const checkAnswer = (word) => {
    if (word.fr === targetWord.fr) completeMiniGame();
    else setTryAgainFeedback();
  };

  const handleDrop = () => {
    if (!draggedWord) return;
    checkAnswer(draggedWord);
    setDraggedWord(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-rose-100 via-sky-50 to-emerald-100 p-4 text-slate-800">
      <SurpriseReward rewardType={activeReward} onComplete={() => setActiveReward(null)} />

      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="rounded-full bg-white/80 px-5 py-3 text-lg font-bold shadow-sm"
          >
            ←
          </button>
          <div className="rounded-full bg-white/80 px-5 py-3 text-sm font-bold shadow-sm">
            {wordCount} mots
          </div>
        </div>

        <div className="flex justify-center">
          <Mascot
            size="lg"
            type={lesson.mascot}
            state={mascotState}
            message={mascotMessage}
            isActive
          />
        </div>

        <AnimatePresence mode="wait">
          {phase === 'world' && (
            <motion.main
              key="world"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <p className="mb-2 text-xl font-bold text-pink-600">Bonjour {childName} !</p>
              <h1 className="mb-6 text-4xl font-black text-slate-800">{lesson.title}</h1>
              <div className="mb-5 grid grid-cols-3 gap-3">
                {lessons.map((world, index) => (
                  <button
                    key={world.id}
                    onClick={() => {
                      setLessonIndex(index);
                      setMascotMessage(`${childName}, allons dans ${world.title} !`);
                    }}
                    className={`rounded-[1.5rem] p-4 shadow-sm ${
                      lesson.id === world.id ? 'bg-pink-500 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    <div className="mb-2 text-4xl">{world.words[0].emoji}</div>
                    <p className="text-sm font-black">{world.title}</p>
                  </button>
                ))}
              </div>
              <div className="mb-7 flex flex-wrap justify-center gap-3">
                {lesson.words.slice(0, 8).map((word) => (
                  <span key={word.fr} className="rounded-3xl bg-white p-5 text-5xl shadow-sm">
                    {word.emoji}
                  </span>
                ))}
              </div>
              <button
                onClick={startWords}
                className="rounded-full bg-pink-500 px-10 py-5 text-2xl font-black text-white shadow-lg"
              >
                Jouer
              </button>
            </motion.main>
          )}

          {phase === 'words' && (
            <motion.main
              key={`word-${currentWord.fr}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="text-center"
            >
              <p className="mb-4 text-2xl font-bold">{childName}, repete :</p>
              <button
                onClick={() => playAudio(currentWord.fr)}
                className="mb-5 w-full rounded-[2rem] bg-white p-8 shadow-lg"
              >
                <div className="mb-3 text-8xl">{currentWord.emoji}</div>
                <div className="text-5xl font-black text-slate-800">{currentWord.fr}</div>
                <div className="mt-2 text-xl font-bold text-slate-500">{currentWord.pt}</div>
              </button>
              <button
                onClick={nextWord}
                className="rounded-full bg-sky-500 px-10 py-5 text-2xl font-black text-white shadow-lg"
              >
                Encore
              </button>
            </motion.main>
          )}

          {phase === 'minigame' && (
            <motion.main
              key="minigame"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="text-center"
            >
              <h2 className="mb-5 text-3xl font-black">{getGameInstruction()}</h2>

              {lesson.gameType === 'findObject' && (
                <div className="grid grid-cols-3 gap-4">
                  {choices.map((word) => (
                    <button
                      key={word.fr}
                      onClick={() => checkAnswer(word)}
                      className="aspect-square rounded-[2rem] bg-white text-7xl shadow-lg"
                    >
                      {word.emoji}
                    </button>
                  ))}
                </div>
              )}

              {lesson.gameType === 'dragObject' && (
                <div className="space-y-5">
                  <div
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDrop}
                    className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-4 border-dashed border-emerald-400 bg-white text-6xl shadow-lg"
                  >
                    🐻
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {choices.map((word) => (
                      <button
                        key={word.fr}
                        draggable
                        onDragStart={() => setDraggedWord(word)}
                        onClick={() => checkAnswer(word)}
                        className="rounded-[2rem] bg-white p-6 text-6xl shadow-lg"
                      >
                        {word.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {lesson.gameType === 'wordBubbles' && (
                <div className="relative h-80 overflow-hidden rounded-[2rem] bg-sky-100">
                  {bubbleChoices.map((word, index) => (
                    <motion.button
                      key={word.fr}
                      onClick={() => checkAnswer(word)}
                      className="absolute rounded-full bg-white/90 px-6 py-5 text-3xl font-black text-sky-700 shadow-lg"
                      initial={{ left: `${16 + index * 28}%`, top: `${22 + (index % 2) * 34}%` }}
                      animate={{ y: [0, -22, 0] }}
                      transition={{ duration: 2.5 + index * 0.4, repeat: Infinity }}
                    >
                      {word.fr}
                    </motion.button>
                  ))}
                </div>
              )}

              {feedback && <p className="mt-5 text-2xl font-black text-emerald-600">{feedback}</p>}
            </motion.main>
          )}

          {phase === 'reward' && (
            <motion.main
              key="reward"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="mb-4 text-4xl font-black">Bravo {childName} !</h2>
              <p className="mb-6 text-2xl font-bold text-slate-600">Recompense gagnee</p>
              <button
                onClick={finishSession}
                className="rounded-full bg-emerald-500 px-10 py-5 text-2xl font-black text-white shadow-lg"
              >
                Terminer
              </button>
            </motion.main>
          )}

          {phase === 'done' && (
            <motion.main
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mb-5 text-8xl">🏆</div>
              <h1 className="mb-6 text-4xl font-black">Bravo {childName} ! A demain pour une nouvelle aventure !</h1>
              <button
                onClick={() => navigate('/')}
                className="rounded-full bg-pink-500 px-10 py-5 text-2xl font-black text-white shadow-lg"
              >
                Accueil
              </button>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Game;
