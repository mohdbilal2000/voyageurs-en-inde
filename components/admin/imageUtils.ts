// Resize/compress an uploaded image file to a data URL so it can be stored in
// the JSON data without bloating localStorage or the published file.
// Photos are downscaled to a max dimension and re-encoded as JPEG.

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

export function fileToCompressedDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Le fichier doit être une image.'));
      return;
    }

    // SVGs can't be drawn-then-rasterised meaningfully — keep them as-is.
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Lecture du fichier impossible.'));
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const scale = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas non supporté.'));
          return;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        try {
          resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
        } catch (err) {
          reject(err instanceof Error ? err : new Error('Compression impossible.'));
        }
      };
      img.onerror = () => reject(new Error('Image illisible.'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Lecture du fichier impossible.'));
    reader.readAsDataURL(file);
  });
}

/** Human-readable size of a data URL / string payload in KB. */
export function approxKb(value: string): number {
  if (!value) return 0;
  // data URLs are base64 — ~3/4 of the string length is bytes.
  return Math.round((value.length * 0.75) / 1024);
}
