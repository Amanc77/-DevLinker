import { useState } from 'react';
import { usersAPI } from '../services/api';

const JoinConfirmDialog = ({ community, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setLoading(true);
    setError('');

    try {
      await usersAPI.joinCommunity(community._id || community.id);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to join community');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-card rounded-xl p-6 w-full max-w-md mx-4 border border-gray-200 dark:border-dark-border">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Join Community?
        </h3>
        <p className="text-gray-600 dark:text-muted-dark mb-6">
          Are you sure you want to join <span className="font-semibold text-gray-900 dark:text-white">{community.title || community.name}</span>?
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Joining...' : 'Yes, Join'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinConfirmDialog;

