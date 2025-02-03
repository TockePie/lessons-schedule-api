/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Selectives` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Selectives" DROP CONSTRAINT "Selectives_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Selectives" DROP CONSTRAINT "Selectives_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "lessonsRows" JSONB,
ADD COLUMN     "schedule" JSONB;

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "Selectives";
