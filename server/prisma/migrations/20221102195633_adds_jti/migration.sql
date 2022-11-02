/*
  Warnings:

  - You are about to drop the column `currentRefreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentRefreshToken",
ADD COLUMN     "currentRefreshTokenId" UUID;
