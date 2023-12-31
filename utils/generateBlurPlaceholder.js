import sharp from 'sharp';

const cache = new Map();

export default async function getBase64ImageUrl(image) {
  let url = cache.get(image);
  if (url) {
    return url;
  }

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`;

  const buffer = await fetchImageBuffer(imageUrl);
  const optimizedBuffer = await optimizeImage(buffer);

  url = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;
  cache.set(image, url);
  return url;
}

async function fetchImageBuffer(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

async function optimizeImage(buffer) {
  const optimizedBuffer = await sharp(buffer).jpeg().toBuffer();
  return optimizedBuffer;
}
