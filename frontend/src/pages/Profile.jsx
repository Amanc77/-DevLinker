import { useState } from 'react';
import CommunityCard from '../components/CommunityCard';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('saved');

  const savedCommunities = [
    {
      id: 1,
      name: 'React Developers',
      description: 'A vibrant community of React developers sharing knowledge, best practices, and helping each other grow.',
      members: '12.5k',
      tags: ['React', 'JavaScript', 'Frontend'],
      matchScore: 95,
    },
    {
      id: 2,
      name: 'Node.js Enthusiasts',
      description: 'Connect with Node.js developers worldwide. Share projects, get help, and learn together.',
      members: '8.3k',
      tags: ['Node.js', 'Backend', 'JavaScript'],
      matchScore: 88,
    },
  ];

  const joinedCommunities = [
    {
      id: 1,
      name: 'React Developers',
      description: 'A vibrant community of React developers sharing knowledge, best practices, and helping each other grow.',
      members: '12.5k',
      tags: ['React', 'JavaScript', 'Frontend'],
      matchScore: 95,
    },
  ];

  const suggestions = [
    {
      id: 3,
      name: 'Python Learners',
      description: 'Perfect for beginners and experts alike. Learn Python, share code, and build amazing projects.',
      members: '15.2k',
      tags: ['Python', 'Programming', 'Learning'],
      matchScore: 92,
    },
    {
      id: 4,
      name: 'Vue.js Community',
      description: 'The progressive JavaScript framework. Join us to discuss Vue, Nuxt, and modern frontend development.',
      members: '6.7k',
      tags: ['Vue', 'JavaScript', 'Frontend'],
      matchScore: 85,
    },
  ];

  const tabs = [
    { id: 'saved', label: 'Saved', count: savedCommunities.length },
    { id: 'joined', label: 'Joined', count: joinedCommunities.length },
    { id: 'suggestions', label: 'Suggestions', count: suggestions.length },
  ];

  const getCurrentCommunities = () => {
    switch (activeTab) {
      case 'saved':
        return savedCommunities;
      case 'joined':
        return joinedCommunities;
      case 'suggestions':
        return suggestions;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl">
              JD
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h1>
              <p className="text-muted-dark dark:text-muted-dark mb-4">
                Full Stack Developer • React, Node.js, Python
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                  React
                </span>
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                  Node.js
                </span>
                <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                  Python
                </span>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-dark-card dark:bg-dark-card border border-dark-border rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-muted-dark dark:text-muted-dark hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
                <span className={`ml-2 ${activeTab === tab.id ? 'text-white/80' : 'text-muted-dark dark:text-muted-dark'}`}>
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {getCurrentCommunities().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentCommunities().map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-muted-dark dark:text-muted-dark mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {activeTab === 'saved' && 'No saved communities yet'}
              {activeTab === 'joined' && 'No joined communities yet'}
              {activeTab === 'suggestions' && 'No suggestions available'}
            </h3>
            <p className="text-muted-dark dark:text-muted-dark mb-6">
              {activeTab === 'saved' && 'Search stacks to find groups and save them for later.'}
              {activeTab === 'joined' && 'Join communities to see them here.'}
              {activeTab === 'suggestions' && 'Complete your profile to get personalized suggestions.'}
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

