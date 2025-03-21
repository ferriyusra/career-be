-- CreateTable
CREATE TABLE "candidate_social" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "linkedin_url" TEXT,

    CONSTRAINT "candidate_social_pkey" PRIMARY KEY ("id")
);
