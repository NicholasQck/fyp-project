/*
  Warnings:

  - The `approved` column on the `SAF` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "SAF_studentID_key";

-- DropIndex
DROP INDEX "SAF_titleID_key";

-- AlterTable
ALTER TABLE "SAF" DROP COLUMN "approved",
ADD COLUMN     "approved" SMALLINT NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Announcement" (
    "announcementID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("announcementID")
);
