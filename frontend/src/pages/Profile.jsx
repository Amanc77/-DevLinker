import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../services/api';
import CommunityCard from '../components/CommunityCard';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('saved');
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [savedCommunities, setSavedCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    fetchUserCommunities();
  }, [isAuthenticated, navigate]);

  const fetchUserCommunities = async () => {
    try {
      const response = await usersAPI.getMyCommunities();
      setJoinedCommunities(response.data.joined || []);
      setSavedCommunities(response.data.saved || []);
    } catch (error) {
      console.error('Error fetching user communities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchUserCommunities();
  };

  const getCurrentCommunities = () => {
    switch (activeTab) {
      case 'saved':
        return savedCommunities.map(jc => jc._id ? jc : { _id: jc, ...jc });
      case 'joined':
        return joinedCommunities.map(jc => jc.communityId || jc);
      default:
        return [];
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'saved', label: 'Saved', count: savedCommunities.length },
    { id: 'joined', label: 'Joined', count: joinedCommunities.length },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.name || 'User'}</h1>
              <p className="text-gray-600 dark:text-muted-dark mb-4">
                {user?.email || ''}
              </p>
              {user?.techStack && user.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {user.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-muted-dark hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
                <span className={`ml-2 ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500 dark:text-muted-dark'}`}>
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : getCurrentCommunities().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentCommunities().map((community) => (
              <CommunityCard
                key={community._id || community.id}
                community={community}
                joinedCommunities={joinedCommunities}
                savedCommunities={savedCommunities}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 dark:text-muted-dark mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {activeTab === 'saved' && 'No saved communities yet'}
              {activeTab === 'joined' && 'No joined communities yet'}
            </h3>
            <p className="text-gray-600 dark:text-muted-dark mb-6">
              {activeTab === 'saved' && 'Search stacks to find groups and save them for later.'}
              {activeTab === 'joined' && 'Join communities to see them here.'}
            </p>
            {activeTab === 'saved' && (
              <a
                href="/discover"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Discover Communities
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
