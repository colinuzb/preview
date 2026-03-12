import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/helpers';

export const BorderViewer = () => {
  const [borderRadius, setBorderRadius] = useState({ tl: 0, tr: 0, br: 0, bl: 0 });
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderColor, setBorderColor] = useState('#3b82f6');
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    const { tl, tr, br, bl } = borderRadius;
    return `border: ${borderWidth}px ${borderStyle} ${borderColor};
border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Border Viewer</h1>
        <p className="text-gray-600">Create and preview custom border styles with live CSS generation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Controls">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Width: {borderWidth}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Style
              </label>
              <select
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="double">Double</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Left: {borderRadius.tl}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderRadius.tl}
                  onChange={(e) => setBorderRadius({ ...borderRadius, tl: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Right: {borderRadius.tr}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderRadius.tr}
                  onChange={(e) => setBorderRadius({ ...borderRadius, tr: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bottom Right: {borderRadius.br}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderRadius.br}
                  onChange={(e) => setBorderRadius({ ...borderRadius, br: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bottom Left: {borderRadius.bl}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderRadius.bl}
                  onChange={(e) => setBorderRadius({ ...borderRadius, bl: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Preview">
            <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#f3f4f6',
                  border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                  borderRadius: `${borderRadius.tl}px ${borderRadius.tr}px ${borderRadius.br}px ${borderRadius.bl}px`,
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
