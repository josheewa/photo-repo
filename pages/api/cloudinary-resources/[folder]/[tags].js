// pages/api/cloudinary-resources/[folder]/[tags].js

import { fetchCloudinaryResources } from '../../../utils/cloudinary';

export default async function handler(req, res) {
  const { folder, tags } = req.query;

  try {
    // You can add more custom logic here if needed
    const data = await fetchCloudinaryResources(folder, tags);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
