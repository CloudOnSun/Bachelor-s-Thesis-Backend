/*
  Warnings:

  - Added the required column `test_name` to the `rfs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rfs" ADD COLUMN     "test_name" TEXT;
