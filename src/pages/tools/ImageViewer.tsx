import { useState, ChangeEvent } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Upload, Image as ImageIcon, X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

export const ImageViewer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setRotation(0);
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleClear = () => {
    setImage(null);
    setRotation(0);
    setZoom(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
          <ImageIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Viewer</h1>
        <p className="text-gray-600">Upload and preview images with controls</p>
      </div>

      {!image ? (
        <Card>
          <div className="text-center py-12">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="inline-flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">Upload an image</p>
                <p className="text-sm text-gray-600 mb-4">
                  Click to browse or drag and drop
                </p>
                <Button>Choose File</Button>
              </div>
            </label>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <Button onClick={handleZoomIn} variant="outline" size="sm">
                <ZoomIn className="w-4 h-4 mr-2" />
                Zoom In
              </Button>
              <Button onClick={handleZoomOut} variant="outline" size="sm">
                <ZoomOut className="w-4 h-4 mr-2" />
                Zoom Out
              </Button>
              <Button onClick={handleRotate} variant="outline" size="sm">
                <RotateCw className="w-4 h-4 mr-2" />
                Rotate
              </Button>
              <Button onClick={handleClear} variant="danger" size="sm">
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 overflow-auto" style={{ maxHeight: '500px' }}>
              <div className="flex items-center justify-center min-h-[400px]">
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${zoom})`,
                    transition: 'transform 0.3s ease',
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </div>
          </Card>

          <Card title="Image Controls">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zoom: {(zoom * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rotation: {rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button variant="outline" fullWidth>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Different Image
                </Button>
              </label>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
