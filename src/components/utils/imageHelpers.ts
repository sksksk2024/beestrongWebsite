// utils/imageHelpers.ts
import { StaticImageData } from 'next/image';

export const getImageUrl = (image: string | StaticImageData): string => {
  if (typeof image === 'string') return image;
  return image.src;
};
