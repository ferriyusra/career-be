-- CreateTable
CREATE TABLE "candidate_cv" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "cv_url" TEXT NOT NULL,

    CONSTRAINT "candidate_cv_pkey" PRIMARY KEY ("id")
);
