/*
  Warnings:

  - You are about to drop the column `travelDate` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `reservationDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "travelDate",
ADD COLUMN     "reservationDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "partyCount" SET DEFAULT 1;
