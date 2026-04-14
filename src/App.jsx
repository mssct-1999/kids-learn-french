import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Parent from './pages/Parent';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/parent" element={<Parent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;