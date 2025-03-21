-- CreateTable
CREATE TABLE "job_categories" (
    "id" SERIAL NOT NULL,
    "category_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "job_categories_pkey" PRIMARY KEY ("id")
);
