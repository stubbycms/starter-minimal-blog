import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold">Code With Conscience</h1>
      <p className="mb-4">
        {`I'm an ethical developer focused on creating sustainable, privacy-conscious software that stands the test of time. My goal is to build systems that are both efficient and ethical, from the codebase to the impact they have on users. I believe in the power of open-source contributions and mindful programming practices that emphasize long-term sustainability. As part of this journey, I share insights on clean code, data privacy, and the role of software in addressing global challenges.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
