/*
  Warnings:

  - You are about to drop the column `profileURL` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "profileURL",
ADD COLUMN     "photoURL" TEXT;
