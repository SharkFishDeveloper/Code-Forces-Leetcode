-- DropForeignKey
ALTER TABLE "SubmissionsProblem" DROP CONSTRAINT "SubmissionsProblem_slug_fkey";

-- AddForeignKey
ALTER TABLE "SubmissionsProblem" ADD CONSTRAINT "SubmissionsProblem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Submission"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
