import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../services/api';
import JoinConfirmDialog from './JoinConfirmDialog';

const CommunityCard = ({ community, joinedCommunities = [], savedCommunities = [], onUpdate }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const communityId = community._id || community.id;
  const isJoined = joinedCommunities.some(jc => 
    (jc.communityId?._id || jc.communityId) === communityId || jc.communityId === communityId
  );
  const isSaved = savedCommunities.some(id => 
    (id._id || id) === communityId
  );

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/profile');
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        await usersAPI.unsaveCommunity(communityId);
      } else {
        await usersAPI.saveCommunity(communityId);
      }
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error saving community:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/profile');
      return;
    }

    if (!isJoined) {
      setShowJoinDialog(true);
    }
  };

  const handleJoinSuccess = () => {
    if (onUpdate) onUpdate();
  };

  const formatMemberCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 card-hover cursor-pointer group">
        <Link to={`/community/${communityId}`} className="block">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                {(community.title || community.name)?.charAt(0)?.toUpperCase() || 'C'}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {community.title || community.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-muted-dark">
                  {formatMemberCount(community.member_count || community.members)} members
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors"
              aria-label="Save community"
            >
              <svg
                className={`w-5 h-5 ${isSaved ? 'text-secondary fill-secondary' : 'text-gray-400 dark:text-muted-dark'}`}
                fill={isSaved ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-gray-600 dark:text-muted-dark mb-4 line-clamp-2">
            {community.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {(community.tags || []).slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
            {community.tags && community.tags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-muted-dark">
                +{community.tags.length - 3}
              </span>
            )}
          </div>
        </Link>

        <button
          onClick={handleJoin}
          disabled={isSaving}
          className={`w-full py-2.5 rounded-lg font-medium transition-all duration-250 ${
            isJoined
              ? 'bg-secondary/20 text-secondary border border-secondary/30'
              : 'bg-primary hover:bg-primary/90 text-white'
          }`}
        >
          {isJoined ? (
            <span className="flex items-center justify-center space-x-2">
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

      {showJoinDialog && (
        <JoinConfirmDialog
          community={community}
          onClose={() => setShowJoinDialog(false)}
          onSuccess={handleJoinSuccess}
        />
      )}
    </>
  );
};

export default CommunityCard;
