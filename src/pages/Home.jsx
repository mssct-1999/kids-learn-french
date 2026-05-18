import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Mascot from '../components/Mascot';
import { childName } from '../data/childProfile';
import { lessons } from '../data/lessons';
import { playMascotVoice } from '../utils/audio';

const Home = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState(0);
  const [mascotMessage, setMascotMessage] = useState(`Bonjour ${childName} !`);

  useEffect(() => {
    const savedStars = localStorage.getItem('kidsFrenchStars');
    if (savedStars) setStars(parseInt(savedStars, 10));
  }, []);

  const handleMascotSpeak = () => {
    const message = `${childName}, on part a l'aventure ?`;
    setMascotMessage(message);
    playMascotVoice(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-sky-50 to-emerald-100 p-4">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <p className="mb-2 text-xl font-black text-pink-600">Bonjour {childName} !</p>
          <h1 className="mb-3 text-5xl font-black text-slate-800">Le Monde d'Ana</h1>
          <p className="mb-7 text-xl font-bold text-slate-600">Une petite aventure en francais</p>

          <button onClick={handleMascotSpeak} className="mb-8">
            <Mascot size="xl" state="idle" message={mascotMessage} type="bear" isActive />
          </button>

          <button
            onClick={() => navigate('/game')}
            className="mb-5 w-full rounded-full bg-pink-500 px-10 py-5 text-2xl font-black text-white shadow-lg"
          >
            Jouer
          </button>

          <div className="mb-6 grid grid-cols-3 gap-3">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="rounded-[1.5rem] bg-white/85 p-4 shadow-sm">
                <div className="mb-2 text-4xl">{lesson.words[0].emoji}</div>
                <p className="text-sm font-black text-slate-700">{lesson.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/minigames')}
              className="rounded-full bg-sky-500 px-5 py-4 text-lg font-black text-white shadow-md"
            >
              Jeux
            </button>
            <button
              onClick={() => navigate('/stories')}
              className="rounded-full bg-emerald-500 px-5 py-4 text-lg font-black text-white shadow-md"
            >
              Histoires
            </button>
          </div>

          <div className="mt-5 rounded-full bg-white/80 px-5 py-3 text-lg font-black text-yellow-600 shadow-sm">
            ⭐ {stars} etoiles
          </div>

          <button
            onClick={() => navigate('/parent')}
            className="mt-4 rounded-full bg-white/70 px-5 py-3 text-sm font-bold text-slate-600"
          >
            Espace Parents
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
