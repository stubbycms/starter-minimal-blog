import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export async function BlogPosts() {
  let allBlogs = await getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (!a.metadata.publishedAt || !b.metadata.publishedAt) return 0;

          return new Date(a.metadata.publishedAt) >
            new Date(b.metadata.publishedAt)
            ? -1
            : 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col mb-5"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums min-w-[120px] whitespace-nowrap">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 flex-1">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
