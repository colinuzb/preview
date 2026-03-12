import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Search, Github, MapPin, Link as LinkIcon, Users, BookOpen, AlertCircle } from 'lucide-react';
import { Loader } from '../../components/Loader';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export const GithubFinder = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchUser = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username.trim()}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('User not found');
        } else {
          setError('Failed to fetch user data');
        }
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchUser();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
          <Github className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GitHub Finder</h1>
        <p className="text-gray-600">Search and explore GitHub users</p>
      </div>

      <Card className="mb-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter GitHub username"
            />
          </div>
          <Button type="submit" size="lg" disabled={loading || !username.trim()}>
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </form>
      </Card>

      {loading && (
        <Card>
          <div className="py-12">
            <Loader text="Searching for user..." />
          </div>
        </Card>
      )}

      {error && (
        <Card>
          <div className="py-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </Card>
      )}

      {user && !loading && (
        <Card>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-32 h-32 rounded-full border-4 border-gray-200"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.name || user.login}
                </h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  @{user.login}
                </a>
              </div>

              {user.bio && (
                <p className="text-gray-700 mb-4">{user.bio}</p>
              )}

              <div className="space-y-2 mb-4">
                {user.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.blog && (
                  <div className="flex items-center text-gray-600">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    <a
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {user.blog}
                    </a>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <BookOpen className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-2xl font-bold text-gray-900">{user.public_repos}</p>
                  <p className="text-sm text-gray-600">Repositories</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-2xl font-bold text-gray-900">{user.followers}</p>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-2xl font-bold text-gray-900">{user.following}</p>
                  <p className="text-sm text-gray-600">Following</p>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => window.open(user.html_url, '_blank')}
                  variant="outline"
                  fullWidth
                >
                  <Github className="w-4 h-4 mr-2" />
                  View GitHub Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
