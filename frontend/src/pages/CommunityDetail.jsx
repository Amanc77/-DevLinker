import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const CommunityDetail = () => {
  const { id } = useParams();
  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock data - in real app, fetch from API
  const community = {
    id: parseInt(id),
    name: 'React Developers',
    description: 'A vibrant community of React developers sharing knowledge, best practices, and helping each other grow. We organize regular meetups, code reviews, and collaborative projects.',
    fullDescription: `Welcome to React Developers - the largest and most active community for React enthusiasts worldwide!

    What we offer:
    • Weekly coding challenges and discussions
    • Expert-led workshops and tutorials
    • Code review sessions
    • Job opportunities and career guidance
    • Collaborative project building
    
    Whether you're a beginner just starting with React or an experienced developer looking to share knowledge, you'll find a welcoming space here. Our community values inclusivity, learning, and helping each other succeed.`,
    members: '12,543',
    weeklyPosts: '234',
    activityLevel: 'Very Active',
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development', 'Hooks', 'Redux'],
    matchScore: 95,
    location: 'Global (Online)',
    founded: '2018',
    relatedCommunities: [
      { id: 2, name: 'Node.js Enthusiasts', match: 88 },
      { id: 4, name: 'Vue.js Community', match: 85 },
      { id: 6, name: 'Full Stack Developers', match: 87 },
    ],
  };

  const handleJoin = () => {
    setIsJoined(!isJoined);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-primary to-secondary relative">
        <div className="absolute inset-0 bg-dark-bg/20"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Header Card */}
        <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl">
                {community.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {community.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-dark dark:text-muted-dark">
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>{community.members} members</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{community.weeklyPosts} posts/week</span>
                  </span>
                  <span className="px-2 py-1 rounded-md bg-secondary/20 text-secondary text-xs font-medium">
                    {community.activityLevel}
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
                    : 'bg-dark-card dark:bg-dark-card border-dark-border text-gray-900 dark:text-white hover:border-primary'
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
            <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
              <p className="text-muted-dark dark:text-muted-dark leading-relaxed whitespace-pre-line">
                {community.fullDescription}
              </p>
            </div>

            {/* Tags */}
            <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {community.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match Score */}
            <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Match</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-secondary mb-2">{community.matchScore}%</div>
                <p className="text-sm text-muted-dark dark:text-muted-dark">Great match for your profile!</p>
              </div>
              <div className="w-full bg-dark-border rounded-full h-2 mb-4">
                <div
                  className="bg-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${community.matchScore}%` }}
                />
              </div>
              <ul className="space-y-2 text-sm text-muted-dark dark:text-muted-dark">
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Matches your tech stack</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Active community</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Similar skill level</span>
                </li>
              </ul>
            </div>

            {/* Community Info */}
            <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Community Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-dark dark:text-muted-dark">Location</span>
                  <span className="text-gray-900 dark:text-white font-medium">{community.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-dark dark:text-muted-dark">Founded</span>
                  <span className="text-gray-900 dark:text-white font-medium">{community.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-dark dark:text-muted-dark">Activity</span>
                  <span className="text-secondary font-medium">{community.activityLevel}</span>
                </div>
              </div>
            </div>

            {/* Related Communities */}
            <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Communities</h3>
              <div className="space-y-3">
                {community.relatedCommunities.map((related) => (
                  <Link
                    key={related.id}
                    to={`/community/${related.id}`}
                    className="block p-3 rounded-lg border border-dark-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{related.name}</span>
                      <span className="text-xs text-secondary font-medium">{related.match}% match</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;

