import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { communitiesAPI, usersAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import JoinConfirmDialog from '../components/JoinConfirmDialog';

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [community, setCommunity] = useState(null);
  const [relatedCommunities, setRelatedCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);

  useEffect(() => {
    fetchCommunity();
    if (isAuthenticated) {
      checkUserStatus();
    }
  }, [id, isAuthenticated]);

  const fetchCommunity = async () => {
    try {
      const response = await communitiesAPI.getById(id);
      setCommunity(response.data);
      setRelatedCommunities(response.related || []);
    } catch (error) {
      console.error('Error fetching community:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserStatus = async () => {
    try {
      const response = await usersAPI.getMyCommunities();
      const joined = response.data.joined || [];
      const saved = response.data.saved || [];
      
      setIsJoined(joined.some(jc => (jc.communityId?._id || jc.communityId) === id));
      setIsSaved(saved.some(c => (c._id || c) === id));
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  const handleJoin = async () => {
    if (!isAuthenticated) {
      navigate('/profile');
      return;
    }

    if (!isJoined) {
      setShowJoinDialog(true);
    } else {
      try {
        await usersAPI.leaveCommunity(id);
        setIsJoined(false);
      } catch (error) {
        console.error('Error leaving community:', error);
      }
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      navigate('/profile');
      return;
    }

    try {
      if (isSaved) {
        await usersAPI.unsaveCommunity(id);
        setIsSaved(false);
      } else {
        await usersAPI.saveCommunity(id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving community:', error);
    }
  };

  const handleJoinSuccess = () => {
    setIsJoined(true);
    checkUserStatus();
  };

  const formatMemberCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count?.toLocaleString() || '0';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Community not found</h2>
          <Link to="/discover" className="text-primary hover:text-primary/80">Back to Discover</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-primary to-secondary relative">
        <div className="absolute inset-0 bg-dark-bg/20 dark:bg-black/20"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Header Card */}
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-8 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl">
                {(community.title || community.name)?.charAt(0)?.toUpperCase() || 'C'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {community.title || community.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-muted-dark">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>{formatMemberCount(community.member_count)} members</span>
                  </span>
                  {community.weeklyPosts > 0 && (
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{community.weeklyPosts} posts/week</span>
                    </span>
                  )}
                  <span className="px-2 py-1 rounded-md bg-secondary/20 text-secondary text-xs font-medium">
                    {community.activity_level}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  isSaved
                    ? 'bg-secondary/20 border-secondary text-secondary'
                    : 'bg-white dark:bg-dark-card border-gray-300 dark:border-dark-border text-gray-700 dark:text-white hover:border-primary'
                }`}
              >
                {isSaved ? (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" clipRule="evenodd" />
                    </svg>
                    <span>Saved</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>Save</span>
                  </span>
                )}
              </button>
              <button
                onClick={handleJoin}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isJoined
                    ? 'bg-secondary/20 text-secondary border border-secondary/30'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {isJoined ? (
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Joined</span>
                  </span>
                ) : (
                  'Join Group'
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
              <p className="text-gray-600 dark:text-muted-dark leading-relaxed whitespace-pre-line">
                {community.fullDescription || community.description}
              </p>
            </div>

            {/* Tags */}
            {community.tags && community.tags.length > 0 && (
              <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Info */}
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Community Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-muted-dark">Platform</span>
                  <span className="text-gray-900 dark:text-white font-medium">{community.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-muted-dark">Location</span>
                  <span className="text-gray-900 dark:text-white font-medium">{community.location_mode}</span>
                </div>
                {community.founded && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-muted-dark">Founded</span>
                    <span className="text-gray-900 dark:text-white font-medium">{community.founded}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-muted-dark">Activity</span>
                  <span className="text-secondary font-medium">{community.activity_level}</span>
                </div>
              </div>
              <a
                href={community.joining_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Visit Community
              </a>
            </div>

            {/* Related Communities */}
            {relatedCommunities.length > 0 && (
              <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Communities</h3>
                <div className="space-y-3">
                  {relatedCommunities.map((related) => (
                    <Link
                      key={related._id}
                      to={`/community/${related._id}`}
                      className="block p-3 rounded-lg border border-gray-200 dark:border-dark-border hover:border-primary transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{related.title || related.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showJoinDialog && (
        <JoinConfirmDialog
          community={community}
          onClose={() => setShowJoinDialog(false)}
          onSuccess={handleJoinSuccess}
        />
      )}
    </div>
  );
};

export default CommunityDetail;
