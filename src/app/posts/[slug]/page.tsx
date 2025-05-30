import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getSinglePost } from "@/lib/post"

// Helper function to format dates with fixed locale to prevent hydration errors
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return 'No date available';
  }

  const date = new Date(dateString);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await getSinglePost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Overlay */}
      <div className="relative h-[70vh] min-h-[500px] bg-gray-900">
        {/* Hero Background */}
        <div className="absolute inset-0">
          {post.feature_image ? (
            <>
              <Image
                src={post.feature_image}
                alt={post.title || "Blog post feature image"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-800"></div>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full max-w-4xl mx-auto px-4">
          <div className="text-white">
            <div className="text-sm font-medium mb-4 opacity-90">Article</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                {post.primary_author ? (
                  <>
                    <div className="relative w-8 h-8">
                      <Image
                        src={post.primary_author.profile_image || "/placeholder.svg?height=32&width=32"}
                        alt={post.primary_author.name || "Author"}
                        className="rounded-full object-cover"
                        fill
                      />
                    </div>
                    <span className="font-medium">{post.primary_author.name || "Unknown Author"}</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <span className="font-medium">Unknown Author</span>
                  </>
                )}
              </div>
              <span className="opacity-75">•</span>
              <span>{formatDate(post.published_at)}</span>
              <span className="opacity-75">•</span>
              <span>{post.reading_time ? `${post.reading_time} min read` : 'Quick read'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article
          className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-p:text-lg prose-li:text-lg prose-img:rounded-lg prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.html || '<p>No content available</p>' }}
        />
      </div>
    </div>
  )
}
