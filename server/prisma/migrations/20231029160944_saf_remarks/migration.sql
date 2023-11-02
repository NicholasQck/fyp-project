/*
  Warnings:

  - Added the required column `remarks` to the `SAF` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SAF" ADD COLUMN     "remarks" TEXT NOT NULL;
