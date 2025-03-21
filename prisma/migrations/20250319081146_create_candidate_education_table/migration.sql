-- CreateTable
CREATE TABLE "candidate_education" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "level" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "gpa" TEXT NOT NULL,

    CONSTRAINT "candidate_education_pkey" PRIMARY KEY ("id")
);
