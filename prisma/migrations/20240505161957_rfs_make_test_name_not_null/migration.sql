/*
  Warnings:

  - Made the column `test_name` on table `rfs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rfs" ALTER COLUMN "test_name" SET NOT NULL;
