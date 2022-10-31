/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashed_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Brick` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Brick" DROP CONSTRAINT "Brick_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "department",
DROP COLUMN "github",
DROP COLUMN "hashed_password",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "name",
DROP COLUMN "picture",
DROP COLUMN "twitter",
DROP COLUMN "updatedAt",
ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "Brick";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "department" "Department",
    "instagram" TEXT,
    "twitter" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
