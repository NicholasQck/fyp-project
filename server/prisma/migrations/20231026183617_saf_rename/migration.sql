/*
  Warnings:

  - You are about to drop the column `approved` on the `SAF` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SAF" DROP COLUMN "approved",
ADD COLUMN     "approvalStatus" SMALLINT NOT NULL DEFAULT 1;
