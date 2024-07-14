/*
  Warnings:

  - You are about to drop the `SubmissionsProblem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `problem` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubmissionsProblem" DROP CONSTRAINT "SubmissionsProblem_slug_fkey";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "problem" TEXT NOT NULL;

-- DropTable
DROP TABLE "SubmissionsProblem";
