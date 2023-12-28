import cloudinary from 'cloudinary'

export default async function handler(req, res) {
  const { selectedTags } = req.query

  const cloudinaryRequest = await cloudinary.v2.search
    .expression(`tags=${selectedTags}`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()

  res.status(200).json(cloudinaryRequest)
}
