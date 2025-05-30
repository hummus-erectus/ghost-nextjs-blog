# Cage Unlimited Blog

A modern, performant blog frontend for Cage Unlimited built with Next.js 15 that connects to a Ghost CMS backend. This project provides a fast, SEO-friendly platform for sharing content about animal liberation through technology.

## Features

- 🚀 **Next.js 15**: Utilizing the App Router and Server Components for optimal performance
- 🔄 **Ghost Content API Integration**: Seamlessly fetches content from Cage Unlimited's Ghost CMS
- 🎨 **Brand-Consistent UI**: Clean, responsive design aligned with Cage Unlimited's identity
- 🖼️ **Image Optimization**: Using Next.js Image component with proper domain configuration
- 🌓 **Dark Mode Support**: Automatic dark mode based on user system preferences
- 📱 **Fully Responsive**: Looks great on all devices from mobile to desktop
- 📑 **Blog Post Cards**: Styled Ghost content cards for linking to other Cage Unlimited articles
- 🔍 **SEO Ready**: Optimized for search engines to increase visibility of animal liberation content

## Prerequisites

- Node.js 18.17.0 or newer
- A Ghost CMS instance (self-hosted or Ghost(Pro))
- Ghost Content API key

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
GHOST_URL=https://your-ghost-blog.com
GHOST_CONTENT_API_KEY=your_content_api_key
```

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/hummus-erectus/ghost-nextjs-blog.git
cd ghost-nextjs-blog
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see your blog.

## Configuration

### Image Domains

The `next.config.ts` file contains configuration for external image domains. If your Ghost instance uses custom image domains or you want to display images from other sources (like Unsplash), add them to the `remotePatterns` array:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-ghost-blog.com",
      pathname: "/content/images/**",
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
  ],
}
```

### Ghost API Settings

The Ghost API configuration is located in `src/lib/post.ts`. You can modify this file to customize the fields fetched from Ghost or change the API behavior.

## Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the design by:

- Modifying `tailwind.config.ts` for theme configuration
- Updating `src/app/globals.css` for global styles
- Editing `src/app/ghost-content.css` for Ghost-specific component styling

### Components

The main blog components are located in:

- `src/app/page.tsx` - Homepage/blog listing
- `src/app/posts/[slug]/page.tsx` - Individual blog post pages

## Deployment

This Next.js app can be deployed to any platform that supports Next.js, including:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

For Vercel deployment, simply connect your repository and Vercel will automatically detect the Next.js project and deploy it.

## About Cage Unlimited

Cage Unlimited is dedicated to supporting animal liberation through cutting-edge technology. They provide tech services to animal advocacy organizations, helping them maximize their impact in creating a kinder world.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Ghost CMS](https://ghost.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

