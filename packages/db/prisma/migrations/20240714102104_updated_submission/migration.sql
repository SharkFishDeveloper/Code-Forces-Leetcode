/*
  Warnings:

  - You are about to drop the `Submissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_problemSlug_fkey";

-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_userId_fkey";

-- DropTable
DROP TABLE "Submissions";

-- CreateTable
CREATE TABLE "Submission" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "SubmissionsProblem" (
    "slug" TEXT NOT NULL,

    CONSTRAINT "SubmissionsProblem_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionsProblem" ADD CONSTRAINT "SubmissionsProblem_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Submission"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_id_fkey" FOREIGN KEY ("id") REFERENCES "SubmissionsProblem"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
