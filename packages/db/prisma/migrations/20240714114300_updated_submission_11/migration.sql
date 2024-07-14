/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_id_fkey";

-- AlterTable
ALTER TABLE "SubmissionsProblem" ADD COLUMN     "status" TEXT[],
ADD COLUMN     "time" TIMESTAMP(3)[];

-- DropTable
DROP TABLE "Status";
