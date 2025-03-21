-- CreateTable
CREATE TABLE "job_application" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "is_applied" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "job_application_pkey" PRIMARY KEY ("id")
);
