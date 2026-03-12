import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Palette, Box, Sparkles, Paintbrush } from 'lucide-react';

export const Design = () => {
  const designTools = [
    {
      title: 'Border Viewer',
      description: 'Create and preview custom border styles with live CSS generation',
      icon: Box,
      path: '/tools/border',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Box Shadow Generator',
      description: 'Design beautiful box shadows with real-time preview and code export',
      icon: Sparkles,
      path: '/tools/box-shadow',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Color Generator',
      description: 'Generate random colors, create palettes, and explore color harmonies',
      icon: Palette,
      path: '/tools/color',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mb-4">
          <Paintbrush className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Tools</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional design utilities to help you create stunning visual elements for your projects.
          Generate CSS, preview styles, and export code instantly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {designTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.path} to={tool.path}>
              <Card hoverable className="h-full cursor-pointer transform hover:scale-105 transition-transform duration-200">
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {tool.description}
                  </p>
                  <div className="mt-4 text-blue-600 font-medium text-sm flex items-center">
                    Open Tool
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Design Tools?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Prototyping</h3>
              <p className="text-sm text-gray-600">
                Quickly experiment with different styles and export production-ready code
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Visual Feedback</h3>
              <p className="text-sm text-gray-600">
                See changes in real-time as you adjust parameters and settings
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">💻</div>
              <h3 className="font-semibold text-gray-900 mb-2">Clean Code</h3>
              <p className="text-sm text-gray-600">
                Generate optimized CSS code that you can directly use in your projects
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
