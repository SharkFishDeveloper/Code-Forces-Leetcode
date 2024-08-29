/*
  Warnings:

  - You are about to drop the column `problem` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "problem";

-- CreateTable
CREATE TABLE "SubmissionsProblem" (
    "slug" TEXT NOT NULL,
    "status" TEXT[],
    "time" TIMESTAMP(3)[],

    CONSTRAINT "SubmissionsProblem_pkey" PRIMARY KEY ("slug")
);

-- AddForeignKey
ALTER TABLE "SubmissionsProblem" ADD CONSTRAINT "SubmissionsProblem_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Submission"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
