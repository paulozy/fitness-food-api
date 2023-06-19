-- CreateTable
CREATE TABLE "imports" (
    "id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_t" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "imports_pkey" PRIMARY KEY ("id")
);
