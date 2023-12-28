import React, { useEffect } from 'react'

const TagSelector = ({ selectedTags, onTagChange, allTags }) => {
  useEffect(() => {
    // Fetch Cloudinary data when selectedTags change
    const fetchData = async () => {
      const response = await fetch(
        `/api/cloudinary?selectedTags=${selectedTags.join(',')}`
      )
      const data = await response.json()

      // Process data as needed
      // ...

      // Call onTagChange with the updated data
      // Example: onTagChange(updatedData);
    }

    fetchData()
  }, [selectedTags, onTagChange])

  return (
    <div className='text-white'>
      <h3>Select Tags:</h3>
      {allTags.map((tag) => (
        <label key={tag}>
          <input
            type="checkbox"
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => onTagChange(tag)}
          />
          {tag}
        </label>
      ))}
    </div>
  )
}

export default TagSelector
