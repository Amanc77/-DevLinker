import { Link } from 'react-router-dom';
import { useState } from 'react';

const CommunityCard = ({ community }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    setIsJoined(!isJoined);
  };

  return (
    <Link to={`/community/${community.id}`}>
      <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-6 card-hover cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
              {community.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {community.name}
              </h3>
              <p className="text-sm text-muted-dark dark:text-muted-dark">
                {community.members} members
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="p-2 rounded-lg hover:bg-dark-border transition-colors"
            aria-label="Save community"
          >
            <svg
              className={`w-5 h-5 ${isSaved ? 'text-secondary fill-secondary' : 'text-muted-dark dark:text-muted-dark'}`}
              fill={isSaved ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-muted-dark dark:text-muted-dark mb-4 line-clamp-2">
          {community.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {community.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
          {community.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-dark-border text-muted-dark dark:text-muted-dark">
              +{community.tags.length - 3}
            </span>
          )}
        </div>

        {community.matchScore && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-dark dark:text-muted-dark">Match Score</span>
              <span className="font-semibold text-secondary">{community.matchScore}%</span>
            </div>
            <div className="w-full bg-dark-border rounded-full h-1.5">
              <div
                className="bg-secondary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${community.matchScore}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleJoin}
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
    </Link>
  );
};

export default CommunityCard;

