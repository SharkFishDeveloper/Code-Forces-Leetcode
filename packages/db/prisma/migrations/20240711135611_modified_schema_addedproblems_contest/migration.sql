-- CreateTable
CREATE TABLE "Problems" (
    "slug" TEXT NOT NULL,
    "description" TEXT[],
    "test_cases" TEXT[],
    "test_cases_ans" TEXT[],
    "level" TEXT NOT NULL,
    "total_submissions" INTEGER NOT NULL,
    "pass_percent" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemSlug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "runtime" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "problemsId" TEXT[],
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_problemSlug_fkey" FOREIGN KEY ("problemSlug") REFERENCES "Problems"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
