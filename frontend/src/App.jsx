import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import CommunityDetail from './pages/CommunityDetail';
import Profile from './pages/Profile';
import MatchMaker from './pages/MatchMaker';

function App() {
  useEffect(() => {
    // Set dark mode as default on initial load
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      root.classList.add('dark');
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-250">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/match" element={<MatchMaker />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
