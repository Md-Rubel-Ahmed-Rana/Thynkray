-- DropForeignKey
ALTER TABLE "PostSection" DROP CONSTRAINT "PostSection_postId_fkey";

-- AddForeignKey
ALTER TABLE "PostSection" ADD CONSTRAINT "PostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
