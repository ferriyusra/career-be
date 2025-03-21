/*
  Warnings:

  - A unique constraint covering the columns `[category_id]` on the table `job_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "job_categories_category_id_key" ON "job_categories"("category_id");
