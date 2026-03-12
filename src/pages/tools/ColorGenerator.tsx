import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Shuffle, Copy, Check } from 'lucide-react';
import { generateRandomColor, copyToClipboard } from '../../utils/helpers';

export const ColorGenerator = () => {
  const [colors, setColors] = useState<string[]>([
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNewColors = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setColors(newColors);
  };

  const handleCopyColor = async (color: string, index: number) => {
    const success = await copyToClipboard(color);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const generateShades = (baseColor: string) => {
    const shades = [];
    for (let i = 0; i < 5; i++) {
      const factor = (i + 1) * 0.2;
      shades.push(adjustBrightness(baseColor, factor));
    }
    return shades;
  };

  const adjustBrightness = (hex: string, factor: number) => {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.floor(((num >> 16) & 0xff) * factor));
    const g = Math.min(255, Math.floor(((num >> 8) & 0xff) * factor));
    const b = Math.min(255, Math.floor((num & 0xff) * factor));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Generator</h1>
        <p className="text-gray-600">Generate random colors and create beautiful color palettes</p>
      </div>

      <Card className="mb-6">
        <div className="flex justify-center">
          <Button onClick={generateNewColors} size="lg">
            <Shuffle className="w-5 h-5 mr-2" />
            Generate New Palette
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {colors.map((color, index) => (
          <Card key={index} className="overflow-hidden p-0">
            <div
              className="h-32 cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
              onClick={() => handleCopyColor(color, index)}
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium">{color.toUpperCase()}</span>
                <button
                  onClick={() => handleCopyColor(color, index)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Color Shades">
        <div className="space-y-4">
          {colors.slice(0, 3).map((color, colorIndex) => (
            <div key={colorIndex}>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Shades of {color.toUpperCase()}
              </p>
              <div className="grid grid-cols-5 gap-2">
                {generateShades(color).map((shade, shadeIndex) => (
                  <div
                    key={shadeIndex}
                    className="h-16 rounded cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
                    style={{ backgroundColor: shade }}
                    onClick={() => copyToClipboard(shade)}
                    title={`Click to copy: ${shade}`}
                  >
                    <span className="text-white text-xs font-mono bg-black bg-opacity-50 px-2 py-1 rounded">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
