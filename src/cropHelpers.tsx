import { Crop, PercentCrop, PixelCrop } from "react-image-crop";

export const makeCenteredPercentCrop = (image: HTMLImageElement): PercentCrop => {
  const width = image.width;
  const height = image.height;
  const size = Math.min(width, height);
  const x = (width - size) / 2;
  const y = (height - size) / 2;
  return {
    unit: '%',
    width: width > height ? size / width * 100 : 100,
    height: width > height ? 100 : size / height * 100,
    x: x / width * 100,
    y: y / height * 100,
  };
}

export const makePixelCropWithScale = (preCropImage: HTMLImageElement, renderedImage: HTMLImageElement, crop: Crop) => {
  const scaleY = renderedImage.naturalHeight / renderedImage.height;
  const scaleX = renderedImage.naturalWidth / renderedImage.width;
  return (crop.unit === '%' ?{
    unit: 'px',
    width: preCropImage.width * crop.width / 100,
    height: preCropImage.height * crop.height / 100,
    x: preCropImage.width * crop.x / 100,
    y: preCropImage.height * crop.y / 100,
  } : {
    unit: 'px',
    width: Math.round(crop.width * scaleX),
    height: Math.round(crop.height * scaleY),
    x: Math.round(crop.x * scaleX),
    y: Math.round(crop.y * scaleY),
  }) as PixelCrop;
}