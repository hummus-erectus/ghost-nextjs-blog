import GhostContentAPI from "@tryghost/content-api";
import { PostsOrPages, PostOrPage } from "@tryghost/content-api";

// Extended interfaces to fix incomplete type definitions from the Ghost Content API
interface GhostPostReadOptions {
  slug: string;
  include?: string[];
}

// Extended browse options for the browse method
interface GhostPostBrowseOptions {
  limit?: string | number;
  include?: string[];
  filter?: string;
  fields?: string;
  order?: string;
}

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
    const options: GhostPostBrowseOptions = {
      include: ["tags", "authors"],
      limit: "all"
    };

    return await api.posts.browse(options as Parameters<typeof api.posts.browse>[0]);
  } catch (err: unknown) {
    console.error(err);
    return undefined;
  }
}

export async function getSinglePost(postSlug: string): Promise<PostOrPage | undefined> {
  try {
    const options: GhostPostReadOptions = {
      slug: postSlug,
      include: ["authors"]
    };

    return await api.posts.read(options as Parameters<typeof api.posts.read>[0]);
  } catch (err: unknown) {
    console.error(err);
    return undefined;
  }
}