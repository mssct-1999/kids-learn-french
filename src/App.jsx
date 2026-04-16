import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Parent from './pages/Parent';
import MiniGames from './pages/MiniGames';
import Stories from './pages/Stories';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/minigames" element={<MiniGames />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/parent" element={<Parent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;