/*
  Warnings:

  - You are about to drop the column `phone_number` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `street` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userId_fkey";

-- DropIndex
DROP INDEX "address_userId_unique";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "phone_number",
DROP COLUMN "userId",
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "address_user_id_unique" ON "address"("user_id");

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
