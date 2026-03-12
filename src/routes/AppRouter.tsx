import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

const Game = lazy(() => import('../pages/Game').then(module => ({ default: module.Game })));
const Design = lazy(() => import('../pages/Design').then(module => ({ default: module.Design })));

const BorderViewer = lazy(() => import('../pages/tools/BorderViewer').then(module => ({ default: module.BorderViewer })));
const BoxShadowGenerator = lazy(() => import('../pages/tools/BoxShadowGenerator').then(module => ({ default: module.BoxShadowGenerator })));
const ColorGenerator = lazy(() => import('../pages/tools/ColorGenerator').then(module => ({ default: module.ColorGenerator })));
const CookieTool = lazy(() => import('../pages/tools/CookieTool').then(module => ({ default: module.CookieTool })));
const FAQ = lazy(() => import('../pages/tools/FAQ').then(module => ({ default: module.FAQ })));
const GithubFinder = lazy(() => import('../pages/tools/GithubFinder').then(module => ({ default: module.GithubFinder })));
const ImageViewer = lazy(() => import('../pages/tools/ImageViewer').then(module => ({ default: module.ImageViewer })));
const Portfolio = lazy(() => import('../pages/tools/Portfolio').then(module => ({ default: module.Portfolio })));
const MoneyTool = lazy(() => import('../pages/tools/MoneyTool').then(module => ({ default: module.MoneyTool })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader text="Loading page..." />
  </div>
);

export const AppRouter = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
          <Route
            path="/design"
            element={
              <ProtectedRoute>
                <Design />
              </ProtectedRoute>
            }
          />

          <Route path="/tools/border" element={<BorderViewer />} />
          <Route path="/tools/box-shadow" element={<BoxShadowGenerator />} />
          <Route path="/tools/color" element={<ColorGenerator />} />
          <Route path="/tools/cookie" element={<CookieTool />} />
          <Route path="/tools/faq" element={<FAQ />} />
          <Route path="/tools/github" element={<GithubFinder />} />
          <Route path="/tools/image-viewer" element={<ImageViewer />} />
          <Route path="/tools/portfolio" element={<Portfolio />} />
          <Route path="/tools/money" element={<MoneyTool />} />

          <Route
            path="*"
            element={
              <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                  Go back home
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
};
