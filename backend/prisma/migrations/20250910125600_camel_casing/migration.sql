/*
  Warnings:

  - You are about to drop the column `end_at` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `is_closed` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `starting_bid` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `winner_uid` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `auction_id` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `user_uid` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `auction_enabled` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `owner_uid` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `auction_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_payment_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `user_uid` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firebase_uid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `Auction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePaymentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[auctionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endAt` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isClosed` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingBid` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auctionId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUid` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerUid` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auctionId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePaymentId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUid` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebaseUid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Auction" DROP CONSTRAINT "Auction_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Auction" DROP CONSTRAINT "Auction_winner_uid_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bid" DROP CONSTRAINT "Bid_auction_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bid" DROP CONSTRAINT "Bid_user_uid_fkey";

-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_owner_uid_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_auction_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_user_uid_fkey";

-- DropIndex
DROP INDEX "public"."Auction_item_id_key";

-- DropIndex
DROP INDEX "public"."Payment_auction_id_key";

-- DropIndex
DROP INDEX "public"."Payment_stripe_payment_id_key";

-- AlterTable
ALTER TABLE "public"."Auction" DROP COLUMN "end_at",
DROP COLUMN "is_closed",
DROP COLUMN "item_id",
DROP COLUMN "starting_bid",
DROP COLUMN "winner_uid",
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isClosed" BOOLEAN NOT NULL,
ADD COLUMN     "itemId" INTEGER NOT NULL,
ADD COLUMN     "startingBid" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "winnerUid" TEXT;

-- AlterTable
ALTER TABLE "public"."Bid" DROP COLUMN "auction_id",
DROP COLUMN "created_at",
DROP COLUMN "user_uid",
ADD COLUMN     "auctionId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Item" DROP COLUMN "auction_enabled",
DROP COLUMN "create_at",
DROP COLUMN "image_url",
DROP COLUMN "owner_uid",
ADD COLUMN     "auctionEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "ownerUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "auction_id",
DROP COLUMN "created_at",
DROP COLUMN "stripe_payment_id",
DROP COLUMN "user_uid",
ADD COLUMN     "auctionId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stripePaymentId" TEXT NOT NULL,
ADD COLUMN     "userUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "created_at",
DROP COLUMN "firebase_uid",
DROP COLUMN "photoURL",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firebaseUid" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "Auction_itemId_key" ON "public"."Auction"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripePaymentId_key" ON "public"."Payment"("stripePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_auctionId_key" ON "public"."Payment"("auctionId");

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_ownerUid_fkey" FOREIGN KEY ("ownerUid") REFERENCES "public"."User"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auction" ADD CONSTRAINT "Auction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auction" ADD CONSTRAINT "Auction_winnerUid_fkey" FOREIGN KEY ("winnerUid") REFERENCES "public"."User"("firebaseUid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "public"."Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "public"."User"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "public"."Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "public"."User"("firebaseUid") ON DELETE RESTRICT ON UPDATE CASCADE;
