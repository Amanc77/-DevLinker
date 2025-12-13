import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import CommunityDetail from './pages/CommunityDetail';
import Profile from './pages/Profile';
import MatchMaker from './pages/MatchMaker';
import UploadCommunity from './pages/UploadCommunity';

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
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-250 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/community/:id" element={<CommunityDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/match" element={<MatchMaker />} />
                <Route path="/upload-community" element={<UploadCommunity />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
