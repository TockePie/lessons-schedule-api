-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT 'https://cdn4.iconfinder.com/data/icons/zira/128/calendar-1024.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "rows" JSONB NOT NULL,
    "lessons" JSONB NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selectives" (
    "id" TEXT NOT NULL,
    "row" JSONB NOT NULL,
    "lessons" JSONB NOT NULL,

    CONSTRAINT "Selectives_pkey" PRIMARY KEY ("id")
);
