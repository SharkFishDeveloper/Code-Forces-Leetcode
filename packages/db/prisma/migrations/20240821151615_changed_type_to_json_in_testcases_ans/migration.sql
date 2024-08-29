/*
  Warnings:

  - Changed the type of `test_cases` on the `Problems` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `test_cases_ans` on the `Problems` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Problems" DROP COLUMN "test_cases",
ADD COLUMN     "test_cases" JSONB NOT NULL,
DROP COLUMN "test_cases_ans",
ADD COLUMN     "test_cases_ans" JSONB NOT NULL;
