/*
  Warnings:

  - The primary key for the `group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `group` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `group` table. All the data in the column will be lost.
  - The primary key for the `schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `isSelective` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `schedule` table. All the data in the column will be lost.
  - The required column `group_id` was added to the `group` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_selective` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - The required column `schedule_id` was added to the `schedule` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_groupId_fkey";

-- AlterTable
ALTER TABLE "group" DROP CONSTRAINT "group_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "groupId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "group_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "group_pkey" PRIMARY KEY ("group_id");

-- AlterTable
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "groupId",
DROP COLUMN "isSelective",
DROP COLUMN "scheduleId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "group_id" TEXT NOT NULL,
ADD COLUMN     "is_selective" BOOLEAN NOT NULL,
ADD COLUMN     "schedule_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "schedule_pkey" PRIMARY KEY ("schedule_id");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
