/*
  Warnings:

  - The `status` column on the `SubmissionsProblem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionsProblem" DROP CONSTRAINT "SubmissionsProblem_userId_fkey";

-- AlterTable
ALTER TABLE "SubmissionsProblem" DROP COLUMN "status",
ADD COLUMN     "status" "SubmissionStatus"[];

-- DropTable
DROP TABLE "Submission";

-- AddForeignKey
ALTER TABLE "SubmissionsProblem" ADD CONSTRAINT "SubmissionsProblem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
