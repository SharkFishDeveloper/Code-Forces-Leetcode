/*
  Warnings:

  - The `test_cases` column on the `Problems` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `test_cases_ans` column on the `Problems` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problems" DROP COLUMN "test_cases",
ADD COLUMN     "test_cases" TEXT[],
DROP COLUMN "test_cases_ans",
ADD COLUMN     "test_cases_ans" TEXT[];
