/*
  Warnings:

  - The primary key for the `SubmissionsProblem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `SubmissionsProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubmissionsProblem" DROP CONSTRAINT "SubmissionsProblem_pkey",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "SubmissionsProblem_pkey" PRIMARY KEY ("userId");
