/*
  Warnings:

  - Added the required column `week_parity` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "weekParity" AS ENUM ('EVEN', 'ODD', 'BOTH');

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "week_parity" "weekParity" NOT NULL;
