import Head from "next/head";
// import Image from "next/image";
import { Image } from 'cloudinary-react';
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
// import { useEffect, useRef } from "react";
import Modal from "../components/Modal";
// import cloudinary from "../utils/cloudinary";
// import getBase64ImageUrl from "../utils/generateBlurPlaceholder";

import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const Home = ({ }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const tags = ['city']; // Replace with your actual tag names
const folder = 'photo-repo'; // Replace with your actual folder name

const tagsExpression = tags.map(tag => `tags=${tag}`).join(' AND ');
const response = await fetch(
  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/list/${folder}?expression=${tagsExpression}`
);
        // const response = await fetch(
        //   // `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/list/city.json`
        //   `https://res.cloudinary.com/ddaymbzcc/resources/image/list/photo-repo?expression=tags=city`
        // );
        console.log(response)
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`);
        }
        const data = await response.json();
    
        // Extract image URLs from the Cloudinary API response
        const imageArray = data.resources.map((image) => ({
          public_id: image.public_id,
          url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image.public_id}`,
        }));
    
        setImages(imageArray);
      } catch (error) {
        console.error('Error fetching images:', error.message);
      } finally {
        setLoading(false); // Set loading to false whether fetching was successful or not
      }
    };
    

    fetchImages();
  }, []);
  return (
    <>
      <Head>
        <title>Photo Gallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {/* {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )} */}

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map((image) => (
          <Link href="/">
        <Image
        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: "translate3d(0, 0, 0)" }}
        key={image.public_id}
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
        publicId={image.public_id}
        width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
        // crop="fill"
        />
        </Link>
      ))}
          {/* {images.map(({ id, public_id, format, blurDataUrl }) => (
            // <Link
            //   key={id}
            //   href={`/?photoId=${id}`}
            //   as={`/p/${id}`}
            //   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            //   shallow
            //   className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
            // >
              <Image
                alt=""
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
            (max-width: 1280px) 50vw,
            (max-width: 1536px) 33vw,
            25vw"
              />
            // </Link>
          ))} */}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12"></footer>
    </>
  );
};

export default Home;
