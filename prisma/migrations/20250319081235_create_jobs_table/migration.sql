-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "job_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employee_type" TEXT NOT NULL,
    "category_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deadline" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
