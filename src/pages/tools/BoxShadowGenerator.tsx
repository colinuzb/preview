import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/helpers';

export const BoxShadowGenerator = () => {
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.3);
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    const rgbaColor = hexToRgba(color, opacity);
    return `box-shadow: ${horizontal}px ${vertical}px ${blur}px ${spread}px ${rgbaColor};`;
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(generateCSS());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Box Shadow Generator</h1>
        <p className="text-gray-600">Design beautiful box shadows with real-time preview</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Controls">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horizontal Offset: {horizontal}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={horizontal}
                onChange={(e) => setHorizontal(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vertical Offset: {vertical}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={vertical}
                onChange={(e) => setVertical(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blur Radius: {blur}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spread Radius: {spread}px
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shadow Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opacity: {opacity.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Preview">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg" style={{ minHeight: '300px' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: `${horizontal}px ${vertical}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`,
                }}
              />
            </div>
          </Card>

          <Card title="CSS Code">
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                {generateCSS()}
              </pre>
              <Button
                onClick={handleCopy}
                size="sm"
                className="absolute top-2 right-2"
                variant={copied ? 'secondary' : 'primary'}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
