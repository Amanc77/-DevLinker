import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CommunityCard from '../components/CommunityCard';
import { communitiesAPI, usersAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [savedCommunities, setSavedCommunities] = useState([]);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const [filters, setFilters] = useState({
    tech_stack: searchParams.get('tech_stack') || '',
    platform: searchParams.get('platform') || '',
    location_mode: searchParams.get('location_mode') || '',
    activity_level: searchParams.get('activity_level') || '',
    search: searchParams.get('search') || '',
  });

  // Sync filters with URL params on mount only
  useEffect(() => {
    const urlTechStack = searchParams.get('tech_stack') || '';
    const urlPlatform = searchParams.get('platform') || '';
    const urlLocationMode = searchParams.get('location_mode') || '';
    const urlActivityLevel = searchParams.get('activity_level') || '';
    const urlSearch = searchParams.get('search') || '';

    setFilters({
      tech_stack: urlTechStack,
      platform: urlPlatform,
      location_mode: urlLocationMode,
      activity_level: urlActivityLevel,
      search: urlSearch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  useEffect(() => {
    // Reset pagination when filters change
    setCurrentPage(1);
    setCommunities([]);
    fetchCommunities(1, true);
    if (isAuthenticated) {
      fetchUserCommunities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isAuthenticated]);

  const fetchCommunities = async (page = 1, reset = false) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const params = {
        page: page.toString(),
        limit: '15',
      };
      
      // Only add non-empty filter values
      if (filters.tech_stack && filters.tech_stack.trim()) {
        params.tech_stack = filters.tech_stack.trim();
      }
      if (filters.platform && filters.platform.trim()) {
        params.platform = filters.platform.trim();
      }
      if (filters.location_mode && filters.location_mode.trim()) {
        params.location_mode = filters.location_mode.trim();
      }
      if (filters.activity_level && filters.activity_level.trim()) {
        params.activity_level = filters.activity_level.trim();
      }
      if (filters.search && filters.search.trim()) {
        params.search = filters.search.trim();
      }

      const response = await communitiesAPI.getAll(params);
      
      if (reset) {
        setCommunities(response.data || []);
      } else {
        setCommunities(prev => [...prev, ...(response.data || [])]);
      }
      
      setCurrentPage(response.page || page);
      setHasMore(response.hasMore || false);
      setTotalCount(response.total || 0);
    } catch (error) {
      console.error('Error fetching communities:', error);
      if (reset) {
        setCommunities([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    // Limit to 100 communities total (approximately 7 pages of 15)
    if (!loadingMore && hasMore && communities.length < 100) {
      fetchCommunities(currentPage + 1, false);
    }
  }, [loadingMore, hasMore, communities.length, currentPage]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && communities.length < 100) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, communities.length, loadMore]);

  const fetchUserCommunities = async () => {
    try {
      const response = await usersAPI.getMyCommunities();
      setJoinedCommunities(response.data.joined || []);
      setSavedCommunities(response.data.saved || []);
    } catch (error) {
      console.error('Error fetching user communities:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params, removing empty values
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k] && newFilters[k].trim()) {
        params[k] = newFilters[k].trim();
      }
    });
    setSearchParams(params);
  };

  const handleSearch = (query) => {
    const newFilters = { ...filters, search: query };
    setFilters(newFilters);
    
    // Update URL params, removing empty values
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k] && newFilters[k].trim()) {
        params[k] = newFilters[k].trim();
      }
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    const emptyFilters = {
      tech_stack: '',
      platform: '',
      location_mode: '',
      activity_level: '',
      search: '',
    };
    setFilters(emptyFilters);
    setSearchParams({});
  };

  const handleUpdate = () => {
    if (isAuthenticated) {
      fetchUserCommunities();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Communities
          </h1>
          <p className="text-gray-600 dark:text-muted-dark">
            Find the perfect community for your tech stack and interests
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder={filters.search || "Search tech stack, location, or interests..."} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-6">
                {/* Tech Stack */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tech Stack
                  </label>
                  <select
                    value={filters.tech_stack}
                    onChange={(e) => handleFilterChange('tech_stack', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Stacks</option>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Python">Python</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Vue">Vue</option>
                    <option value="Angular">Angular</option>
                    <option value="Django">Django</option>
                    <option value="Flask">Flask</option>
                    <option value="General">General</option>
                    <option value="Web Dev">Web Dev</option>
                    <option value="Backend">Backend</option>
                    <option value="ML/AI">ML/AI</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile (iOS)">Mobile (iOS)</option>
                    <option value="Mobile (Android)">Mobile (Android)</option>
                    <option value="Game Dev">Game Dev</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Blockchain/Web3">Blockchain/Web3</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Platform
                  </label>
                  <select
                    value={filters.platform}
                    onChange={(e) => handleFilterChange('platform', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Platforms</option>
                    <option value="Discord">Discord</option>
                    <option value="Slack">Slack</option>
                    <option value="Reddit">Reddit</option>
                    <option value="Forum">Forum</option>
                    <option value="Telegram">Telegram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Meetup">Meetup</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Blog">Blog</option>
                    <option value="Community">Community</option>
                    <option value="Guide">Guide</option>
                  </select>
                </div>

                {/* Location Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location Mode
                  </label>
                  <select
                    value={filters.location_mode}
                    onChange={(e) => handleFilterChange('location_mode', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Modes</option>
                    <option value="Global/Online">Global/Online</option>
                    <option value="Global/Online & Offline">Global/Online & Offline</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="India/Online">India/Online</option>
                  </select>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activity Level
                  </label>
                  <select
                    value={filters.activity_level}
                    onChange={(e) => handleFilterChange('activity_level', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Levels</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Very Active">Very Active</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Community Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-muted-dark">
                {loading ? (
                  'Loading...'
                ) : totalCount > 0 ? (
                  `Showing ${communities.length} of ${Math.min(totalCount, 100)}${totalCount > 100 ? ` (${totalCount} total)` : ''} communities`
                ) : (
                  `${communities.length} communities found`
                )}
              </p>
            </div>

            {loading && communities.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-600 dark:text-muted-dark">Loading communities...</p>
              </div>
            ) : communities.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl">
                <p className="text-gray-600 dark:text-muted-dark">No communities found. Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {communities.map((community) => (
                    <CommunityCard
                      key={community._id || community.id}
                      community={community}
                      joinedCommunities={joinedCommunities}
                      savedCommunities={savedCommunities}
                      onUpdate={handleUpdate}
                    />
                  ))}
                </div>
                
                {/* Load More Section - Auto-loads when scrolled into view */}
                {hasMore && communities.length < 100 && (
                  <div ref={loadMoreRef} className="mt-8 text-center">
                    {loadingMore ? (
                      <div className="py-4">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-muted-dark">Loading more communities...</p>
                      </div>
                    ) : (
                      <button
                        onClick={loadMore}
                        className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
                      >
                        <span>Load More Communities</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {communities.length} of {Math.min(totalCount, 100)} communities loaded
                      {totalCount > 100 && ` (showing first 100 of ${totalCount} total)`}
                    </p>
                  </div>
                )}
                {communities.length >= 100 && totalCount > 100 && (
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-muted-dark">
                      Showing first 100 communities. {totalCount - 100} more available.
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Discover;
