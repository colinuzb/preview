import { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Cookie, Trash2, Plus } from 'lucide-react';

interface CookieItem {
  key: string;
  value: string;
}

export const CookieTool = () => {
  const [cookies, setCookies] = useState<CookieItem[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    loadCookies();
  }, []);

  const loadCookies = () => {
    const items: CookieItem[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !key.startsWith('user')) {
        items.push({
          key,
          value: localStorage.getItem(key) || '',
        });
      }
    }
    setCookies(items);
  };

  const addCookie = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    localStorage.setItem(newKey, newValue);
    loadCookies();
    setNewKey('');
    setNewValue('');
  };

  const deleteCookie = (key: string) => {
    localStorage.removeItem(key);
    loadCookies();
  };

  const clearAll = () => {
    const userItem = localStorage.getItem('user');
    localStorage.clear();
    if (userItem) {
      localStorage.setItem('user', userItem);
    }
    loadCookies();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Cookie className="w-8 h-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900">Cookie Tool</h1>
        </div>
        <p className="text-gray-600">Manage browser localStorage items</p>
      </div>

      <Card title="Add New Item" className="mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key</label>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter key name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-3">
          <Button onClick={addCookie} disabled={!newKey.trim() || !newValue.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
          <Button onClick={clearAll} variant="danger">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </Card>

      <Card title={`Stored Items (${cookies.length})`}>
        {cookies.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Cookie className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No items stored yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cookies.map((cookie) => (
              <div
                key={cookie.key}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{cookie.key}</p>
                  <p className="text-sm text-gray-600 truncate">{cookie.value}</p>
                </div>
                <button
                  onClick={() => deleteCookie(cookie.key)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
