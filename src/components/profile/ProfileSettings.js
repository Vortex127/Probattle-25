import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Toast from '../common/Toast';

export default function ProfileSettings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [toast, setToast] = useState(null);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: '',
    email: user?.email || '',
    notifications: {
      email: true,
      push: true
    },
    theme
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: API call to update profile
      setToast({
        message: 'Profile updated successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        message: 'Failed to update profile',
        type: 'error'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <input
                id="email-notifications"
                type="checkbox"
                checked={profile.notifications.email}
                onChange={(e) => setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    email: e.target.checked
                  }
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                Email notifications
              </label>
            </div>
            <div className="flex items-start">
              <input
                id="push-notifications"
                type="checkbox"
                checked={profile.notifications.push}
                onChange={(e) => setProfile({
                  ...profile,
                  notifications: {
                    ...profile.notifications,
                    push: e.target.checked
                  }
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push-notifications" className="ml-3 text-sm text-gray-700">
                Push notifications
              </label>
            </div>
          </div>
        </div>

        {/* Theme Preference */}
        <div>
          <h3 className="text-lg font-medium text-gray-900">Theme</h3>
          <div className="mt-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>

      {toast && <Toast {...toast} />}
    </div>
  );
} 