import { useState } from 'react';

interface ExifData {
  cameraMake?: string;
  cameraModel?: string;
  dateTime?: string;
  gpsLatitude?: string;
  gpsLongitude?: string;
  orientation?: number;
  imageWidth?: number;
  imageHeight?: number;
}

export const useExifExtraction = () => {
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const extractExif = async (file: File): Promise<ExifData | null> => {
    setIsExtracting(true);
    try {
      const EXIF = (await import('exif-js')).default;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            EXIF.getData(img as any, function() {
              const exif: ExifData = {};
              const make = EXIF.getTag(img, 'Make');
              const model = EXIF.getTag(img, 'Model');
              const dateTime = EXIF.getTag(img, 'DateTime');
              const gpsLatitude = EXIF.getTag(img, 'GPSLatitude');
              const gpsLongitude = EXIF.getTag(img, 'GPSLongitude');

              if (make) exif.cameraMake = make;
              if (model) exif.cameraModel = model;
              if (dateTime) exif.dateTime = dateTime;
              if (gpsLatitude) exif.gpsLatitude = gpsLatitude.toString();
              if (gpsLongitude) exif.gpsLongitude = gpsLongitude.toString();
              
              exif.imageWidth = img.width;
              exif.imageHeight = img.height;

              setExifData(exif);
              resolve(exif);
            });
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Erro ao extrair EXIF:', error);
      return null;
    } finally {
      setIsExtracting(false);
    }
  };

  return { exifData, isExtracting, extractExif };
};
