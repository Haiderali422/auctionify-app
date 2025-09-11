/*
  Warnings:

  - You are about to drop the column `winner_id` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_uid` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_uid` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountCents` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uid` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Auction" DROP CONSTRAINT "Auction_winner_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bid" DROP CONSTRAINT "Bid_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- DropIndex
DROP INDEX "public"."User_firebase_uid_key";

-- AlterTable
ALTER TABLE "public"."Auction" DROP COLUMN "winner_id",
ADD COLUMN     "winner_uid" TEXT;

-- AlterTable
ALTER TABLE "public"."Bid" DROP COLUMN "user_id",
ADD COLUMN     "user_uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Item" DROP COLUMN "owner_id",
ADD COLUMN     "owner_uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "amount",
DROP COLUMN "user_id",
ADD COLUMN     "amountCents" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "user_uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("firebase_uid");

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_owner_uid_fkey" FOREIGN KEY ("owner_uid") REFERENCES "public"."User"("firebase_uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auction" ADD CONSTRAINT "Auction_winner_uid_fkey" FOREIGN KEY ("winner_uid") REFERENCES "public"."User"("firebase_uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bid" ADD CONSTRAINT "Bid_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "public"."User"("firebase_uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "public"."User"("firebase_uid") ON DELETE RESTRICT ON UPDATE CASCADE;
