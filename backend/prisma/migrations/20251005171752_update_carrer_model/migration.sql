/*
  Warnings:

  - You are about to drop the column `rodmap` on the `CarrerPath` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CarrerPath` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarrerPath" DROP COLUMN "rodmap",
ADD COLUMN     "roadmap" TEXT[],
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CarrerPath" ADD CONSTRAINT "CarrerPath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
