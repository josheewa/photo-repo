import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter, useEffect } from "next/router";
import Carousel from "../../../components/Carousel";
import getResults from "../../../utils/cachedImages";
import { fetchCloudinaryResources } from "../../../utils/cloudinary";

// import cloudinary from "../../utils/cloudinary";
// import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";

const Home = ({images }) => {
  const router = useRouter();
  const { tag, photoId } = router.query;
  let index = Number(photoId);


  const currentPhoto = images.find(
    (img) => img.id === Number(photoId)
  );
  console.log(currentPhoto)

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const { tag } = context.params;

  try {
    const results = await fetchCloudinaryResources(tag);

    let reducedResults = [];
    let i = 0;

    for (let result of results.resources) {
      reducedResults.push({
        id: i,
        height: result.height,
        width: result.width,
        public_id: result.public_id,
        format: result.format,
      });
      i++;
    }

    return {
      props: {
        images: reducedResults,
      },
    };
  } catch (error) {
    console.error('Error fetching images:', error.message);

    return {
      notFound: true,
    };
  }
};

export default Home;
