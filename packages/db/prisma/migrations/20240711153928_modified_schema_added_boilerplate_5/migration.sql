-- AlterTable
ALTER TABLE "Problems" ALTER COLUMN "test_cases" SET NOT NULL,
ALTER COLUMN "test_cases" SET DATA TYPE TEXT,
ALTER COLUMN "test_cases_ans" SET NOT NULL,
ALTER COLUMN "test_cases_ans" SET DATA TYPE TEXT;
