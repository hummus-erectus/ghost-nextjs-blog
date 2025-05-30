import GhostContentAPI from "@tryghost/content-api";
import { PostsOrPages, PostOrPage } from "@tryghost/content-api";

// Validate environment variables
if (!process.env.GHOST_URL) {
  throw new Error('GHOST_URL environment variable is not defined');
}

if (!process.env.GHOST_CONTENT_API_KEY) {
  throw new Error('GHOST_CONTENT_API_KEY environment variable is not defined');
}

const api = new GhostContentAPI({
  url: process.env.GHOST_URL as string,
  key: process.env.GHOST_CONTENT_API_KEY as string,
  version: "v5.0"
});

export async function getPosts(): Promise<PostsOrPages | undefined> {
  try {
    return await api.posts.browse({
      include: ["tags", "authors"],
      limit: "all"
    });
  } catch (err: unknown) {
    console.error(err);
    return undefined;
  }
}

export async function getSinglePost(postSlug: string): Promise<PostOrPage | undefined> {
  try {
    return await api.posts.read({
      slug: postSlug
    });
  } catch (err: unknown) {
    console.error(err);
    return undefined;
  }
}