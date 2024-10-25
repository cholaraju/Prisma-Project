import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostPage() {
  // const posts = await prisma.post.findMany({});
  const user = await prisma.user.findUnique({
   where: { email: "tharun@gmail.com" },
   include: { posts: true },
  
  })
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24">
      <h1 className="border-t border-b">All posts ({user?.posts.length})</h1>
      <ul>
        {user?.posts.map((post) => (
          <li key={post.slug} className="flex items-center">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input
          type="text"
          name="title"
          placeholder="title"
          className="px-2 py-2 rounded-sm"
        />
        <textarea
          name="content"
          className="px-2 py-2 rounded-sm"
          placeholder="content"
          rows={5}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-2 rounded-sm"
        >
          Create post
        </button>
      </form>
    </main>
  );
}