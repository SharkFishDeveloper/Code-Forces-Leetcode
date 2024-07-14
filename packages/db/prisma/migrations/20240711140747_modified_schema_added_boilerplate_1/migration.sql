/*
  Warnings:

  - Changed the type of `status` on the `Submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('Accepted', 'Wrong Answer', 'Compile Error');

-- AlterTable
ALTER TABLE "Problems" ADD COLUMN     "boilerplateCppFull" TEXT[],
ADD COLUMN     "boilerplateCppHalf" TEXT[],
ADD COLUMN     "boilerplateJavaFull" TEXT[],
ADD COLUMN     "boilerplateJavaHalf" TEXT[],
ADD COLUMN     "boilerplateJavascriptFull" TEXT[],
ADD COLUMN     "boilerplateJavascriptHalf" TEXT[],
ADD COLUMN     "boilerplatePythonFull" TEXT[],
ADD COLUMN     "boilerplatePythonHalf" TEXT[];

-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "status",
ADD COLUMN     "status" "SubmissionStatus" NOT NULL;
