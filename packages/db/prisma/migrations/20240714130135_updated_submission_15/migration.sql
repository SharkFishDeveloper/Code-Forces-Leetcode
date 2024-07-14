/*
  Warnings:

  - The primary key for the `SubmissionsProblem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SubmissionsProblem" DROP CONSTRAINT "SubmissionsProblem_pkey",
ADD CONSTRAINT "SubmissionsProblem_pkey" PRIMARY KEY ("slug");
