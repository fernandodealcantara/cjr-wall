/*
  Warnings:

  - Made the column `instagram` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitter` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `github` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedin` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "instagram" SET NOT NULL,
ALTER COLUMN "instagram" SET DEFAULT '',
ALTER COLUMN "twitter" SET NOT NULL,
ALTER COLUMN "twitter" SET DEFAULT '',
ALTER COLUMN "github" SET NOT NULL,
ALTER COLUMN "github" SET DEFAULT '',
ALTER COLUMN "linkedin" SET NOT NULL,
ALTER COLUMN "linkedin" SET DEFAULT '';
