import Link from "next/link";
import { getPosts } from "@/lib/post"
import { notFound } from "next/navigation";

// Constants
const EXCERPT_WORD_LIMIT = 45;

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

// Helper function to truncate text with ellipsis
function truncateExcerpt(
  text: string | null | undefined,
  wordLimit: number = EXCERPT_WORD_LIMIT
): string {
  if (!text) return '';

  const words = text.split(' ');
  if (words.length <= wordLimit) return text;

  return words.slice(0, wordLimit).join(' ') + '...';
}

export default async function BlogHome() {
  const posts = await getPosts();

  if (!posts) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center border-b border-gray-100 mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">CU Blog</h1>
        <p className="text-xl max-w-2xl mx-auto">Animal liberation through cutting-edge tech.</p>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-16">
          {posts.map((post) => (
            <article key={post.id} className="border-b border-gray-100 pb-16 last:border-b-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <div className="text-sm mb-6">
                <span>By {post.primary_author?.name || 'Unknown Author'}</span>
                <span>{' '}on{' '}</span>
                <span>{formatDate(post.published_at)}</span>
              </div>

              <p className="text-lg leading-relaxed">{truncateExcerpt(post.excerpt)}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
