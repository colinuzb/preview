import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import {
  Palette,
  Box,
  Image,
  Github,
  Cookie,
  HelpCircle,
  Briefcase,
  DollarSign,
  Sparkles
} from 'lucide-react';

export const Home = () => {
  const tools = [
    {
      title: 'Border Viewer',
      description: 'Create and preview custom border styles with live updates',
      icon: Box,
      path: '/tools/border',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Box Shadow Generator',
      description: 'Generate beautiful box shadows with real-time preview',
      icon: Sparkles,
      path: '/tools/box-shadow',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Color Generator',
      description: 'Generate random colors and color palettes instantly',
      icon: Palette,
      path: '/tools/color',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Image Viewer',
      description: 'Upload and preview images with advanced controls',
      icon: Image,
      path: '/tools/image-viewer',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'GitHub Finder',
      description: 'Search and explore GitHub users and repositories',
      icon: Github,
      path: '/tools/github',
      color: 'from-gray-700 to-gray-900',
    },
    {
      title: 'Cookie Tool',
      description: 'Manage browser cookies and storage with ease',
      icon: Cookie,
      path: '/tools/cookie',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions and help documentation',
      icon: HelpCircle,
      path: '/tools/faq',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Portfolio',
      description: 'View developer portfolio and project showcase',
      icon: Briefcase,
      path: '/tools/portfolio',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      title: 'Money Tool',
      description: 'Currency converter and financial calculator',
      icon: DollarSign,
      path: '/tools/money',
      color: 'from-green-600 to-emerald-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to ToolBox
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your collection of modern web development tools and utilities. Explore, create, and enhance your workflow with our suite of powerful tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
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
                    Try it now
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
    </div>
  );
};
