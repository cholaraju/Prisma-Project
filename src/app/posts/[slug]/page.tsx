import prisma from "@/lib/db";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post =await prisma.post.findUnique({
  
  where: {
      slug: params.slug,
  }
      
  }
  )

  return (
    <div className="flex flex-col items-center gap-y-5 pt-24">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <p>{post?.content}</p>
    </div>
  );
}