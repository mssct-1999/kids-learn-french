import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { categories, getCategory } from '../data/categories';
import confetti from 'canvas-confetti';

// Question types
const QUESTION_TYPES = {
  WHERE_IS: 'where_is',
  SPELL: 'spell',
  MATCH: 'match',
  MULTIPLE_CHOICE_TEXT: 'multiple_choice_text'
};

const Game = () => {
  const [currentCategory, setCurrentCategory] = useState('animals');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [stars, setStars] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [progress, setProgress] = useState(0);

  // Load category
  useEffect(() => {
    const categoryData = getCategory(currentCategory);
    setWords(categoryData.words);
    setCurrentIndex(0);
    setProgress(0);
    setShowQuiz(false);
  }, [currentCategory]);

  // Load stars from localStorage
  useEffect(() => {
    const savedStars = localStorage.getItem('kidsFrenchStars');
    if (savedStars) setStars(parseInt(savedStars));
  }, []);

  // Save stars to localStorage
  useEffect(() => {
    localStorage.setItem('kidsFrenchStars', stars.toString());
  }, [stars]);

  const playAudio = (text, isWord = true) => {
    // Check for custom audio file first
    const audioFile = `/audio/${text.toLowerCase().replace(/\s+/g, '_')}.mp3`;
    const audio = new Audio(audioFile);

    audio.oncanplaythrough = () => {
      audio.play();
    };

    audio.onerror = () => {
      // Fallback to TTS if custom audio doesn't exist
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      if (isWord) utterance.rate = 0.8; // Slower for words
      speechSynthesis.speak(utterance);
    };

    // Try to load custom audio
    audio.load();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    });
  };

  const nextCard = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(((currentIndex + 1) / words.length) * 100);
    } else {
      // Save progress
      const currentWordsLearned = parseInt(localStorage.getItem('kidsFrenchWordsLearned') || '0');
      localStorage.setItem('kidsFrenchWordsLearned', (currentWordsLearned + words.length).toString());
      localStorage.setItem('kidsFrenchLastPlayed', new Date().toISOString());

      // Update streak (simplified - in real app, check consecutive days)
      const currentStreak = parseInt(localStorage.getItem('kidsFrenchStreak') || '0');
      localStorage.setItem('kidsFrenchStreak', (currentStreak + 1).toString());

      // Save category progress
      const categoryProgress = JSON.parse(localStorage.getItem('kidsFrenchCategoryProgress') || '{}');
      categoryProgress[currentCategory] = (categoryProgress[currentCategory] || 0) + 1;
      localStorage.setItem('kidsFrenchCategoryProgress', JSON.stringify(categoryProgress));

      // Save total time spent (estimate 2 minutes per category)
      const totalTime = parseInt(localStorage.getItem('kidsFrenchTotalTime') || '0');
      localStorage.setItem('kidsFrenchTotalTime', (totalTime + 2).toString());

      generateQuestion();
      setShowQuiz(true);
    }
  };

  const generateQuestion = () => {
    const types = Object.values(QUESTION_TYPES);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomWord = words[Math.floor(Math.random() * words.length)];

    switch (randomType) {
      case QUESTION_TYPES.WHERE_IS:
        const distractors = words
          .filter(w => w.word !== randomWord.word)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        setCurrentQuestion({
          type: randomType,
          question: `Où est le ${randomWord.word} ?`,
          correct: randomWord.image,
          options: [...distractors.map(w => w.image), randomWord.image].sort(() => 0.5 - Math.random())
        });
        break;
      case QUESTION_TYPES.SPELL:
        setCurrentQuestion({
          type: randomType,
          question: `Écris le mot pour ${randomWord.image}`,
          correct: randomWord.word,
          image: randomWord.image
        });
        break;
      case QUESTION_TYPES.MATCH:
        const matchOptions = words
          .filter(w => w.word !== randomWord.word)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        setCurrentQuestion({
          type: randomType,
          question: `Quelle image correspond au mot "${randomWord.word}" ?`,
          correct: randomWord.image,
          options: [...matchOptions.map(w => w.image), randomWord.image].sort(() => 0.5 - Math.random()),
          word: randomWord.word
        });
        break;
      case QUESTION_TYPES.MULTIPLE_CHOICE_TEXT:
        const wrongOptions = words
          .filter(w => w.word !== randomWord.word)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2)
          .map(w => w.word);
        setCurrentQuestion({
          type: randomType,
          question: `Quel est le mot pour ${randomWord.image} ?`,
          correct: randomWord.word,
          options: [...wrongOptions, randomWord.word].sort(() => 0.5 - Math.random()),
          image: randomWord.image
        });
        break;
    }
  };

  const handleAnswer = (answer) => {
    let isCorrect = false;
    switch (currentQuestion.type) {
      case QUESTION_TYPES.WHERE_IS:
      case QUESTION_TYPES.MATCH:
      case QUESTION_TYPES.MULTIPLE_CHOICE_TEXT:
        isCorrect = answer === currentQuestion.correct;
        break;
      case QUESTION_TYPES.SPELL:
        isCorrect = answer.toLowerCase().trim() === currentQuestion.correct.toLowerCase();
        break;
    }

    if (isCorrect) {
      setStars(prev => prev + 1);
      setFeedback('correct');
      playAudio('Bravo !');
      triggerConfetti(); // Add confetti celebration
      setTimeout(() => {
        generateQuestion();
        setFeedback('');
        setUserInput('');
      }, 2000);
    } else {
      setFeedback('incorrect');
      playAudio('Essaie encore !');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  if (showQuiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-full max-w-md">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <motion.div
            key={currentQuestion?.question}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 text-center"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">{currentQuestion?.question}</h2>

            {currentQuestion?.type === QUESTION_TYPES.WHERE_IS && (
              <div className="flex justify-center space-x-4 mb-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAnswer(option)}
                    className={`text-5xl p-4 rounded-xl transition-all ${
                      feedback === 'correct' && option === currentQuestion.correct ? 'bg-green-100 border-4 border-green-500' :
                      feedback === 'incorrect' ? 'bg-red-100' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {currentQuestion?.type === QUESTION_TYPES.SPELL && (
              <div className="mb-4">
                <div className="text-6xl mb-4">{currentQuestion.image}</div>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnswer(userInput)}
                  className={`w-full p-3 text-xl border-2 rounded-lg text-center ${
                    feedback === 'correct' ? 'border-green-500 bg-green-50' :
                    feedback === 'incorrect' ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Tape le mot..."
                  autoFocus
                />
                <button
                  onClick={() => handleAnswer(userInput)}
                  className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Vérifier
                </button>
              </div>
            )}

            {currentQuestion?.type === QUESTION_TYPES.MULTIPLE_CHOICE_TEXT && (
              <div className="mb-4">
                <div className="text-6xl mb-4">{currentQuestion.image}</div>
                <div className="grid grid-cols-1 gap-2">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className={`p-3 text-lg font-medium rounded-lg transition-all ${
                        feedback === 'correct' && option === currentQuestion.correct ? 'bg-green-100 border-2 border-green-500 text-green-800' :
                        feedback === 'incorrect' ? 'bg-red-100 border-2 border-red-500' : 'bg-blue-50 hover:bg-blue-100 border-2 border-blue-200'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {currentQuestion?.type === QUESTION_TYPES.MATCH && (
              <div className="mb-4">
                <div className="text-2xl mb-4 font-bold text-purple-600">"{currentQuestion.word}"</div>
                <div className="flex justify-center space-x-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAnswer(option)}
                      className={`text-5xl p-4 rounded-xl transition-all ${
                        feedback === 'correct' && option === currentQuestion.correct ? 'bg-green-100 border-4 border-green-500' :
                        feedback === 'incorrect' ? 'bg-red-100' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Clique sur l'image qui correspond au mot
                </div>
              </div>
            )}

            <div className="mt-4 text-lg">⭐ {stars} étoiles</div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  // Show loading if words haven't loaded yet or currentWord is undefined
  if (!words || words.length === 0 || !currentWord) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-600">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="w-full max-w-md">        {/* Category Selector */}
        {!showQuiz && currentIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <h2 className="text-lg font-semibold text-center mb-2">Choisis une catégorie</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(categories).map(([key, cat]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentCategory(key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentCategory === key
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.icon} {cat.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="text-7xl mb-4">{currentWord.image}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentWord.word}</h2>
          <p className="text-lg text-gray-600 mb-6">({currentWord.en})</p>

          <div className="flex justify-center space-x-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playAudio(currentWord.word)}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              🎤 Écoute
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playAudio(currentWord.word)}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              🔁 Répète
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextCard}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg font-semibold"
          >
            Suivant →
          </motion.button>
        </motion.div>

        <div className="text-center mt-4 text-gray-600">
          Mot {currentIndex + 1} sur {words.length}
        </div>
      </div>
    </div>
  );
};

export default Game;