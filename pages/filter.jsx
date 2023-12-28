// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useEffect, useRef } from 'react'
// import Modal from '../components/Modal'
// import cloudinary from '../utils/cloudinary'
// import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
// import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
// import React, { useState } from 'react'
// import TagSelector from '../components/TagSelector'

// const Home = ({ cloudinaryData }) => {
//     const router = useRouter();
//     const { photoId } = router.query;
//     const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
//     const lastViewedPhotoRef = useRef(null);
//     const [images, setImages] = useState([]);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const allTags = ['landscape', 'city', 'flowers', 'astro'];
  
//     const handleTagChange = (tag) => {
//       setSelectedTags((prevTags) =>
//         prevTags.includes(tag)
//           ? prevTags.filter((prevTag) => prevTag !== tag)
//           : [...prevTags, tag]
//       );
//     };
  
//     const fetchImages = async () => {
//       try {
//         // Perform Cloudinary search based on selected tags
//         const results = await cloudinary.v2.search
//           .expression(`resource_type:image AND tags=${selectedTags.join(',')}`)
//           .sort_by('public_id', 'desc')
//           .max_results(400)
//           .execute();
  
//         // Process and format the fetched data
//         let reducedResults = [];
//         let i = 0;
//         for (let result of results.resources) {
//           reducedResults.push({
//             id: i,
//             height: result.height,
//             width: result.width,
//             public_id: result.public_id,
//             format: result.format,
//           });
//           i++;
//         }
  
//         // Fetch base64 data URLs for blurred images
//         const blurImagePromises = results.resources.map((image) => {
//           return getBase64ImageUrl(image);
//         });
//         const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);
  
//         // Add blurDataUrl to the reducedResults
//         for (let i = 0; i < reducedResults.length; i++) {
//           reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
//         }
  
//         // Update the state with the fetched images
//         setImages(reducedResults);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };
  
//     useEffect(() => {
//       // Fetch images when selectedTags change on the client side
//       if (typeof window !== 'undefined') {
//         fetchImages();
//       }
//     }, [selectedTags]);
  
//     // ... (previous code)
// //   useEffect(() => {
// //     // Fetch Cloudinary data when selectedTags change
// //     const fetchData = async () => {
// //       const response = await fetch(
// //         `./api/cloudinary?selectedTags=${selectedTags.join(',')}`
// //       )
// //       const data = await response.json()

// //       // Process data as needed
// //       let reducedResults = []
// //       let i = 0

// //       for (let result of data.resources) {
// //         reducedResults.push({
// //           id: i,
// //           height: result.height,
// //           width: result.width,
// //           public_id: result.public_id,
// //           format: result.format,
// //         })
// //         i++
// //       }

// //       const blurImagePromises = data.resources.map((image) => {
// //         return getBase64ImageUrl(image)
// //       })

// //       const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

// //       for (let i = 0; i < reducedResults.length; i++) {
// //         reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
// //       }

// //       setImages(reducedResults)
// //     }

// //     fetchData()
// //   }, [selectedTags])
//   return (
//     <>
//       <Head>
//         <title>Photo Gallery</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>
//       <main className="mx-auto max-w-[1960px] p-4">
//         <TagSelector
//           selectedTags={selectedTags}
//           onTagChange={handleTagChange}
//           allTags={allTags}
//         />
//         {photoId && (
//           <Modal
//             images={images}
//             onClose={() => {
//               setLastViewedPhoto(photoId)
//             }}
//           />
//         )}

//         <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
//           {images.map(({ id, public_id, format, blurDataUrl }) => (
//             <Link
//               key={id}
//               href={`/?photoId=${id}`}
//               as={`/p/${id}`}
//               ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
//               shallow
//               className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
//             >
//               <Image
//                 className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
//                 style={{ transform: 'translate3d(0, 0, 0)' }}
//                 placeholder="blur"
//                 blurDataURL={blurDataUrl}
//                 src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${public_id}.${format}`}
//                 width={720}
//                 height={480}
//                 sizes="(max-width: 640px) 100vw,
//             (max-width: 1280px) 50vw,
//             (max-width: 1536px) 33vw,
//             25vw"
//               />
//             </Link>
//           ))}
//         </div>
//       </main>
//       <footer className="p-6 text-center text-white/80 sm:p-12"></footer>
//     </>
//   )
// }

// // export async function getStaticProps() {
// //   // Fetch initial Cloudinary data
// //   const initialResponse = await fetch(`./api/cloudinary?selectedTags=tag1,tag2`)
// //   const initialData = await initialResponse.json()

// //   // Process initial data as needed
// //   let initialImages = []
// //   let i = 0

// //   for (let result of initialData.resources) {
// //     initialImages.push({
// //       id: i,
// //       height: result.height,
// //       width: result.width,
// //       public_id: result.public_id,
// //       format: result.format,
// //     })
// //     i++
// //   }

// //   const blurImagePromises = initialData.resources.map((image) => {
// //     return getBase64ImageUrl(image)
// //   })

// //   const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

// //   for (let i = 0; i < initialImages.length; i++) {
// //     initialImages[i].blurDataUrl = imagesWithBlurDataUrls[i]
// //   }

// //   return {
// //     props: {
// //       initialImages,
// //     },
// //   }
// // }
// export default Home
// // export async function getStaticProps() {
// //   const results = await cloudinary.v2.search
// //     .expression(`folder:${process.env.CLOUDINARY_FOLDER}/* AND resource_type:image AND tags=city`)
// //     .sort_by('public_id', 'desc')
// //     .max_results(400)
// //     .execute()
// //   let reducedResults = []

// //   let i = 0
// //   for (let result of results.resources) {
// //     reducedResults.push({
// //       id: i,
// //       height: result.height,
// //       width: result.width,
// //       public_id: result.public_id,
// //       format: result.format,
// //     })
// //     i++
// //   }

// //   const blurImagePromises = results.resources.map((image) => {
// //     return getBase64ImageUrl(image)
// //   })
// //   const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

// //   for (let i = 0; i < reducedResults.length; i++) {
// //     reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
// //   }

// //   return {
// //     props: {
// //       images: reducedResults,
// //     },
// //   }
// // }
