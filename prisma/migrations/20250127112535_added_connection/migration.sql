/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "groupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Selectives" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "scheduleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_groupId_key" ON "Schedule"("groupId");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selectives" ADD CONSTRAINT "Selectives_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selectives" ADD CONSTRAINT "Selectives_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
