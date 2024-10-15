import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export async function BlogPosts() {
  let allBlogs = await getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.frontmatter.publishedAt) >
            new Date(b.frontmatter.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col mb-5"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums min-w-[120px] whitespace-nowrap">
                {formatDate(post.frontmatter.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-1">
                {post.frontmatter.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
