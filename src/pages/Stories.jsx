import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Stories = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    {
      id: 'animals',
      title: 'L\'aventure des animaux',
      icon: '🐾',
      description: 'Une histoire amusante avec tous les animaux',
      pages: 8,
      difficulty: 'Facile',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'colors',
      title: 'Le monde des couleurs',
      icon: '🌈',
      description: 'Découvrez les couleurs magiques',
      pages: 6,
      difficulty: 'Facile',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'family',
      title: 'Ma grande famille',
      icon: '👨‍👩‍👧‍👦',
      description: 'Rencontre toute la famille',
      pages: 7,
      difficulty: 'Facile',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'adventure',
      title: 'L\'aventure de Max',
      icon: '🗺️',
      description: 'Une grande aventure avec Max',
      pages: 12,
      difficulty: 'Moyen',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const handleStorySelect = (story) => {
    setSelectedStory(story);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 p-4">
      <div className="max-w-md mx-auto">
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            📚 Histoires
          </h1>
          <p className="text-gray-600">Écoute et découvre des histoires en français !</p>
        </motion.div>

        {/* Stories Grid */}
        <div className="space-y-4 mb-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStorySelect(story)}
              className={`bg-gradient-to-r ${story.color} rounded-2xl p-4 shadow-lg cursor-pointer`}
            >
              <div className="flex items-center">
                <div className="text-4xl mr-4">{story.icon}</div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1">{story.title}</h3>
                  <p className="text-white/90 text-sm mb-2">{story.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      {story.pages} pages
                    </span>
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                      {story.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-white text-2xl">▶️</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Story Preview */}
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 text-center"
          >
            <div className="text-6xl mb-4">{selectedStory.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedStory.title}</h2>
            <p className="text-gray-600 mb-4">{selectedStory.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-2xl font-bold text-gray-800">{selectedStory.pages}</p>
                <p className="text-sm text-gray-500">Pages</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-800">{selectedStory.difficulty}</p>
                <p className="text-sm text-gray-500">Difficulté</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-bold shadow-lg"
              >
                🎧 Écouter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-full font-bold shadow-lg"
              >
                📖 Lire
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
          className="w-full bg-white text-gray-700 py-3 rounded-full shadow-lg font-semibold hover:shadow-xl transition-shadow mt-4"
        >
          Retour à l'accueil
        </motion.button>
      </div>
    </div>
  );
};

export default Stories;