import { getBlogPosts } from "app/blog/utils";

export const baseUrl = "https://portfolio-blog-starter.vercel.app";

export default async function sitemap() {
  let blogs = await getBlogPosts();

  if (!blogs) {
    return [];
  }

  blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.frontmatter.slug}`,
    lastModified: post.frontmatter.publishedAt,
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
