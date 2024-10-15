import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPost, removeFrontMatter } from "app/blog/utils";
import { baseUrl } from "app/sitemap";

export async function generateMetadata({ params }) {
  let post = await getBlogPost(params.slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.output.frontmatter;

  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  let post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.output.frontmatter.title,
            datePublished: post.output.frontmatter.publishedAt,
            dateModified: post.output.frontmatter.publishedAt,
            description: post.output.frontmatter.summary,
            image: post.output.frontmatter.image
              ? `${baseUrl}${post.output.frontmatter.image}`
              : `/og?title=${encodeURIComponent(
                  post.output.frontmatter.title
                )}`,
            url: `${baseUrl}/blog/${post.output.frontmatter.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl">
        {post.output.frontmatter.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.output.frontmatter.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={removeFrontMatter(post.content)} />
      </article>
    </section>
  );
}
