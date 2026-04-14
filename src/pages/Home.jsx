import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const savedStars = localStorage.getItem('kidsFrenchStars');
    if (savedStars) setStars(parseInt(savedStars));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 p-4">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full"
        >
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
            >
              ☀️ Bonjour Ana 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600"
            >
              Prête à apprendre le français ?
            </motion.p>
          </div>

          {/* Animated Character */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <div className="text-8xl mb-4">🐻</div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white rounded-full px-4 py-2 shadow-lg"
            >
              <p className="text-xl font-medium text-gray-800">"On joue en français ?"</p>
            </motion.div>
          </motion.div>

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/game')}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-xl mb-8 hover:shadow-2xl transition-shadow"
          >
            ▶️ Jouer
          </motion.button>

          {/* Daily Challenge Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100"
          >
            <div className="flex items-center justify-center mb-3">
              <span className="text-2xl mr-2">🔥</span>
              <h2 className="text-xl font-bold text-gray-800">Série du jour</h2>
            </div>
            <p className="text-gray-600 mb-2">3 minutes d'apprentissage</p>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3">
              <p className="text-lg font-semibold text-gray-800">🐶 Animaux - Niveau 1</p>
              <p className="text-sm text-gray-600">16 nouveaux mots à découvrir !</p>
              <p className="text-xs text-gray-500 mt-1">🎨 Couleurs • 🍎 Fruits • 🔢 Nombres • 👨‍👩‍👧‍👦 Famille</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center space-x-6"
          >
            <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-sm text-gray-500">Étoiles</p>
                <p className="text-lg font-bold text-yellow-600">{stars}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center space-x-2">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="text-sm text-gray-500">Récompenses</p>
                <p className="text-lg font-bold text-purple-600">3</p>
              </div>
            </div>
          </motion.div>

          {/* Achievement Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-4 py-2 shadow-lg"
          >
            <p className="text-white font-semibold">🏆 Apprenti Français</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;