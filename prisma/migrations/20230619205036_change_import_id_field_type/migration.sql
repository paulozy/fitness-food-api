/*
  Warnings:

  - The primary key for the `imports` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "imports" DROP CONSTRAINT "imports_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "imports_pkey" PRIMARY KEY ("id");
