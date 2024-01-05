# PhotoRepo

## Project Overview

This project is a photo gallery website showcasing an assortment of personal photos. It is built using React and Next.js, hosted on Vercel. 

## Features

- **Photo Gallery:** Display a collection of photos in an elegant and responsive gallery format.
- **React and Next.js:** Utilize the power of React for building a dynamic and interactive user interface with the efficiency of server-side rendering provided by Next.js.
- **Vercel Hosting:** Deploy and host the website seamlessly with Vercel, ensuring high performance and reliability.
- **Image Gallery Template:** Leverage a pre-built Vercel template for creating a visually appealing and user-friendly photo gallery.
- **Email Form:** Allow users to contact you through an email form, enhancing communication and engagement.

## Prerequisites

Before running or deploying the project, make sure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm (Node Package Manager): Included with Node.js installation

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/josheewa/photo-repo.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd photo-repo
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Deployment

To deploy the website to Vercel:

1. **Create a Vercel account:**

    [Sign up for a Vercel account](https://vercel.com/signup).

2. **Install Vercel CLI:**

    ```bash
    npm install -g vercel
    ```

3. **Deploy the project:**

    ```bash
    vercel
    ```

    Follow the prompts to link your Vercel account and configure deployment settings.

## Configuration

### Image Gallery Configuration

- **Cloudinary as Backend Host:**
  - Sign up for a [Cloudinary account](https://cloudinary.com/).
  - Upload your photos to Cloudinary and obtain the necessary credentials.
  - Update the gallery configuration in the source code to fetch images from your Cloudinary account.
  - Replace the existing image URLs with the Cloudinary URLs in the designated gallery component.

### Email Form Configuration

- **Setting up Email Form:**
  - Update the email form settings in the source code to use your preferred email service or API.
  - Replace the placeholder values with your actual email service API key, endpoint, or other required information.

### Environment Variables

- **Secure Information with Environment Variables:**
  - Create a `.env.local` file in the project root.
  - Add the following environment variables:
    - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
    - `CLOUDINARY_API_KEY`: Your Cloudinary API key.
    - `CLOUDINARY_API_SECRET`:  Your Cloudinary API secret.
    - `CLOUDINARY_FOLDER`: Your Cloudinary folder
    - `TRANSPORT_EMAIL`: Your transporter email
    - `TRANSPORT_EMAIL_PASS`: App password for transporter email
  - Ensure the `.env.local` file is included in your `.gitignore` to prevent sensitive information from being committed to version control.
  - Transfer the local environment variables to Vercel to ensure that the website has access to the required configuration settings during the build process.

By configuring these settings and using environment variables, you can easily customize the image gallery source and email form without exposing sensitive information publicly. Always ensure that your environment variables are kept secure and not shared publicly.

## Contributing

Feel free to contribute to the project by opening issues, submitting pull requests, or providing feedback. Your input is highly appreciated!

## License

This project is licensed under the [GNU General Public License](LICENSE).
