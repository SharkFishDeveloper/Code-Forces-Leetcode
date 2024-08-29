/*
  Warnings:

  - The `status` column on the `SubmissionsProblem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SubmissionsProblem" DROP COLUMN "status",
ADD COLUMN     "status" TEXT[];
