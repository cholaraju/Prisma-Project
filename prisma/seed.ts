import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPosts: Prisma.postCreateInput[] = [
  {
    title: "Post-1",
    slug: "post-1",
    content: "This is the first post 1",
    author: {
      connectOrCreate: {
        where: {
          email: "john@example.com",
        },
        create: {
          email: "john@example.com",
          hashedPassword:
            "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        },
      },
    },
  },
];
async function main() {
console.log("Seeding database...");
  for (const post of initialPosts) {
  const newPost = await prisma.post.create({
      data: post,
  });
  console.log(`Created post with id: ${newPost.id}`);
  }
  console.log("Seeding complete.");


}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
