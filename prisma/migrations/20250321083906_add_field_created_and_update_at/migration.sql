/*
  Warnings:

  - Added the required column `updated_at` to the `candidate_cv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `candidate_education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `candidate_social` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `job_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_cv" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "candidate_education" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "candidate_social" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "job_categories" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;
