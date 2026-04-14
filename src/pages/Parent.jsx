import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Parent = () => {
  const [stats, setStats] = useState({
    stars: 0,
    streak: 0,
    wordsLearned: 0,
    lastPlayed: null
  });

  useEffect(() => {
    const savedStars = localStorage.getItem('kidsFrenchStars') || '0';
    const savedStreak = localStorage.getItem('kidsFrenchStreak') || '0';
    const savedWords = localStorage.getItem('kidsFrenchWordsLearned') || '0';
    const lastPlayed = localStorage.getItem('kidsFrenchLastPlayed');

    setStats({
      stars: parseInt(savedStars),
      streak: parseInt(savedStreak),
      wordsLearned: parseInt(savedWords),
      lastPlayed: lastPlayed ? new Date(lastPlayed) : null
    });
  }, []);

  const StatCard = ({ icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg p-4 border-l-4 ${color}`}
    >
      <div className="flex items-center">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Progression de Ana</h1>
          <p className="text-gray-600">Suivez les progrès en français</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon="⭐"
            title="Étoiles gagnées"
            value={stats.stars}
            color="border-yellow-400"
          />
          <StatCard
            icon="🔥"
            title="Série actuelle"
            value={`${stats.streak} jours`}
            color="border-orange-400"
          />
          <StatCard
            icon="🧠"
            title="Mots appris"
            value={stats.wordsLearned}
            color="border-blue-400"
          />
          <StatCard
            icon="🎯"
            title="Niveau actuel"
            value="Animaux 1"
            color="border-green-400"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Statistiques récentes</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temps d'apprentissage</span>
              <span className="font-semibold">15 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Précision moyenne</span>
              <span className="font-semibold">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dernière session</span>
              <span className="font-semibold">
                {stats.lastPlayed ? stats.lastPlayed.toLocaleDateString('fr-FR') : 'Aucune'}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Recommandations</h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <p className="text-gray-800 font-medium mb-2">Continuer avec les animaux !</p>
            <p className="text-sm text-gray-600">
              Ana maîtrise bien les bases. Prochain objectif : les couleurs et les formes.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Récompenses</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-3xl mb-1">🥇</div>
              <p className="text-xs text-gray-600">10 étoiles</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🥈</div>
              <p className="text-xs text-gray-600">25 étoiles</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">🥉</div>
              <p className="text-xs text-gray-600">50 étoiles</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Parent;