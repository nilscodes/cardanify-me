import { PixelCrop } from 'react-image-crop'

export function canvasPreview(image: HTMLImageElement, crop: PixelCrop) {
  // Create a canvas element
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // Set the canvas size to the cropped area size
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Draw the cropped section of the image onto the canvas
  // The parameters of drawImage method are (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(
    image, // source image
    crop.x, // source x
    crop.y, // source y
    crop.width, // source width
    crop.height, // source height
    0, // destination x
    0, // destination y
    crop.width, // destination width
    crop.height // destination height
  );

  // Convert the canvas to a data URL in PNG format
  return canvas.toDataURL('image/png');
}
