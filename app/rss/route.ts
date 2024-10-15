import { baseUrl } from "app/sitemap";
import { getBlogPosts } from "app/blog/utils";

export async function GET() {
  let allBlogs = await getBlogPosts();

  if (!allBlogs || allBlogs.length === 0) {
    return new Response("No blog posts found", {
      status: 404,
    });
  }

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.createdAt) > new Date(b.createdAt)) {
        return -1;
      }
      return 1;
    })
    .map((post) => {
      return `<item>
          <title>${post.frontmatter?.title || ""}</title>
          <link>${baseUrl}/blog/${post.frontmatter?.slug}</link>
          <description>${post.frontmatter?.summary || ""}</description>
          <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
        </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Code With Conscience</title>
        <link>${baseUrl}</link>
        <description>Code With Conscience's RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
