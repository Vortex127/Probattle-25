import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileSettings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: '',
    email: user?.email || '',
    notifications: {
      email: true,
      push: true
    },
    theme: 'light'
  });

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      {/* Profile form implementation */}
    </div>
  );
} 