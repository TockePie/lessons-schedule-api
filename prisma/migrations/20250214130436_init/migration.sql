-- CreateEnum
CREATE TYPE "lessonType" AS ENUM ('LECTURE', 'PRACTICE', 'LAB');

-- CreateTable
CREATE TABLE "group" (
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT 'https://cdn4.iconfinder.com/data/icons/zira/128/calendar-1024.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "schedule" (
    "scheduleId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "lessonType" NOT NULL,
    "day" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "isSelective" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("scheduleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "group_name_key" ON "group"("name");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;
