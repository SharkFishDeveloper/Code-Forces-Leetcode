/*
  Warnings:

  - The primary key for the `Contest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Contest_pkey" PRIMARY KEY ("name");
