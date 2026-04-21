import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { categories } from '../data/categories';
import Mascot from '../components/Mascot';
import { PopBubbles, CatchMascot, QuickTapGame } from '../components/InteractiveElements';

const MiniGames = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [memoryGame, setMemoryGame] = useState(null);
  const [bubbleWords, setBubbleWords] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const games = [
    {
      id: 'memory',
      name: 'Mémoire',
      icon: '🧠',
      description: 'Trouve les paires identiques',
      color: 'from-purple-400 to-pink-400',
      difficulty: 'Facile'
    },
    {
      id: 'bubble',
      name: 'Éclate les Bulles',
      icon: '🫧',
      description: 'Pop les bulles avec les mots',
      color: 'from-blue-400 to-cyan-400',
      difficulty: 'Facile'
    },
    {
      id: 'catch',
      name: 'Attrape le Mascotte',
      icon: '🐻',
      description: 'Attrape le mascotte qui bouge',
      color: 'from-orange-400 to-yellow-400',
      difficulty: 'Moyen'
    },
    {
      id: 'quicktap',
      name: 'Tap Rapide',
      icon: '⚡',
      description: 'Clique aussi vite que tu peux',
      color: 'from-red-400 to-pink-400',
      difficulty: 'Difficile'
    },
    {
      id: 'dragdrop',
      name: 'Glisse-dépose',
      icon: '🎯',
      description: 'Associe les mots aux images',
      color: 'from-green-400 to-emerald-400',
      difficulty: 'Moyen'
    },
    {
      id: 'soundmatch',
      name: 'Match Audio',
      icon: '🎵',
      description: 'Écoute et associe les sons',
      color: 'from-indigo-400 to-purple-400',
      difficulty: 'Moyen'
    }
  ];

  const startMemoryGame = () => {
    // Get random words from different categories
    const allWords = [];
    Object.values(categories).forEach(cat => {
      allWords.push(...cat.words.slice(0, 3)); // Take first 3 words from each category
    });

    // Select 6 random words for the memory game
    const selectedWords = allWords.sort(() => 0.5 - Math.random()).slice(0, 6);
    const cards = [...selectedWords, ...selectedWords].map((word, index) => ({
      id: index,
      word: word.word,
      image: word.image,
      isFlipped: false,
      isMatched: false
    })).sort(() => 0.5 - Math.random());

    setMemoryGame({
      cards,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0
    });
  };

  const handleMemoryCardClick = (cardId) => {
    if (!memoryGame) return;

    const card = memoryGame.cards.find(c => c.id === cardId);
    if (card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...memoryGame.flippedCards, cardId];
    const newCards = memoryGame.cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard.word === secondCard.word) {
        // Match found
        setTimeout(() => {
          setMemoryGame(prev => ({
            ...prev,
            cards: prev.cards.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            ),
            flippedCards: [],
            matchedPairs: prev.matchedPairs + 1,
            moves: prev.moves + 1
          }));
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setMemoryGame(prev => ({
            ...prev,
            cards: prev.cards.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            ),
            flippedCards: [],
            moves: prev.moves + 1
          }));
        }, 1000);
      }
    }

    setMemoryGame(prev => ({
      ...prev,
      cards: newCards,
      flippedCards: newFlippedCards
    }));
  };

  const getBubbleWords = () => {
    const allWords = [];
    Object.values(categories).forEach(cat => {
      allWords.push(...cat.words.slice(0, 4));
    });
    return allWords.sort(() => 0.5 - Math.random()).slice(0, 8);
  };

  const startBubbleGame = () => {
    setBubbleWords(getBubbleWords());
    setGameScore(0);
  };

  const handleBubblePop = () => {
    const newScore = gameScore + 1;
    setGameScore(newScore);
    if (newScore === 8) {
      setShowCompletion(true);
    }
  };

  const handleCatchComplete = () => {
    setGameScore(prev => prev + 1);
    setShowCompletion(true);
  };

  const handleQuickTapComplete = () => {
    setGameScore(prev => prev + 1);
    setShowCompletion(true);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    if (game.id === 'memory') {
      startMemoryGame();
    } else if (game.id === 'bubble') {
      startBubbleGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Mascot in corner */}
        <div className="absolute top-4 right-4 z-20">
          <Mascot size="sm" isActive={true} autoAnimate={true} type="cat" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="absolute left-4 top-4 text-2xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🎮 Jeux Mini
          </h1>
          <p className="text-gray-600">Apprends en t'amusant !</p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGameSelect(game)}
              className={`bg-gradient-to-br ${game.color} rounded-2xl p-4 shadow-lg cursor-pointer`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{game.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{game.name}</h3>
                <p className="text-white/80 text-sm mb-2">{game.description}</p>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  {game.difficulty}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bubble Pop Game */}
        {selectedGame?.id === 'bubble' && bubbleWords.length > 0 && !showCompletion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🫧 Éclate les Bulles</h2>
              <p className="text-gray-600">Éclaté: {gameScore}/8</p>
            </div>
            <PopBubbles 
              words={bubbleWords} 
              onBubblePop={handleBubblePop}
              isActive={true}
            />
          </motion.div>
        )}

        {/* Catch Mascot Game */}
        {selectedGame?.id === 'catch' && !showCompletion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🐻 Attrape le Mascotte</h2>
              <p className="text-gray-600">Clique vite pour l'attraper!</p>
            </div>
            <CatchMascot 
              mascotEmoji="🐻"
              onCatch={handleCatchComplete}
              isActive={true}
            />
          </motion.div>
        )}

        {/* Quick Tap Game */}
        {selectedGame?.id === 'quicktap' && !showCompletion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">⚡ Tap Rapide</h2>
              <p className="text-gray-600">Clique aussi vite que tu peux!</p>
            </div>
            <QuickTapGame 
              targetCount={10}
              onComplete={handleQuickTapComplete}
              isActive={true}
            />
          </motion.div>
        )}

        {/* Selected Game Info (for games not yet implemented) */}
        {selectedGame && !memoryGame && bubbleWords.length === 0 && selectedGame.id !== 'catch' && selectedGame.id !== 'quicktap' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 text-center"
          >
            <div className="text-6xl mb-4">{selectedGame.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedGame.name}</h2>
            <p className="text-gray-600 mb-4">{selectedGame.description}</p>
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-500">Difficulté: <span className="font-semibold text-gray-700">{selectedGame.difficulty}</span></p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectedGame.id === 'memory' ? startMemoryGame() : null}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg"
            >
              Jouer Maintenant
            </motion.button>
          </motion.div>
        )}

        {/* Completion Screen */}
        {showCompletion && selectedGame && selectedGame.id !== 'memory' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 text-center mb-8"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Super Travail!</h3>
            <p className="text-gray-600 mb-6">Tu as complété le jeu de {selectedGame.name}!</p>
            <div className="flex justify-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleGameSelect(selectedGame);
                  setShowCompletion(false);
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-bold"
              >
                Rejouer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedGame(null);
                  setShowCompletion(false);
                  setBubbleWords([]);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-full font-bold"
              >
                Menu Jeux
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Memory Game */}
        {memoryGame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🧠 Jeu de Mémoire</h2>
              <p className="text-gray-600">Trouve toutes les paires !</p>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="bg-blue-100 rounded-lg px-3 py-2">
                  <p className="text-sm text-blue-700">Paires: {memoryGame.matchedPairs}/6</p>
                </div>
                <div className="bg-purple-100 rounded-lg px-3 py-2">
                  <p className="text-sm text-purple-700">Coups: {memoryGame.moves}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {memoryGame.cards.map((card) => (
                <motion.button
                  key={card.id}
                  whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMemoryCardClick(card.id)}
                  className={`aspect-square rounded-xl shadow-md transition-all duration-300 ${
                    card.isMatched
                      ? 'bg-green-100 border-2 border-green-500'
                      : card.isFlipped
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300'
                  }`}
                  disabled={card.isMatched}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {card.isFlipped || card.isMatched ? (
                      <>
                        <div className="text-3xl mb-1">{card.image}</div>
                        <div className="text-xs font-semibold text-gray-700">{card.word}</div>
                      </>
                    ) : (
                      <div className="text-3xl">❓</div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {memoryGame.matchedPairs === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Bravo !</h3>
                <p className="text-gray-600 mb-4">Tu as trouvé toutes les paires en {memoryGame.moves} coups !</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMemoryGame(null)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold"
                >
                  Rejouer
                </motion.button>
              </motion.div>
            )}

            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMemoryGame(null);
                  setSelectedGame(null);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-full font-bold"
              >
                Retour
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Back to Home */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="w-full bg-white text-gray-700 py-3 rounded-full shadow-lg font-semibold hover:shadow-xl transition-shadow mt-6"
        >
          Retour à l'accueil
        </motion.button>
      </div>
    </div>
  );
};

export default MiniGames;