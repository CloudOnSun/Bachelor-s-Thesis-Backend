/*
  Warnings:

  - You are about to drop the `Damage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Damage" DROP CONSTRAINT "Damage_rfs_id_fkey";

-- DropTable
DROP TABLE "Damage";

-- CreateTable
CREATE TABLE "damage" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location1" DOUBLE PRECISION NOT NULL,
    "location2" DOUBLE PRECISION NOT NULL,
    "depth1" DOUBLE PRECISION NOT NULL,
    "depth2" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "rfs_id" INTEGER NOT NULL,

    CONSTRAINT "damage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "damage" ADD CONSTRAINT "damage_rfs_id_fkey" FOREIGN KEY ("rfs_id") REFERENCES "rfs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
