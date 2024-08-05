/*
  Warnings:

  - A unique constraint covering the columns `[produitId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produitId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tarifId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `nombre` INTEGER NOT NULL,
    ADD COLUMN `produitId` INTEGER NOT NULL,
    ADD COLUMN `tarif` VARCHAR(191) NULL,
    ADD COLUMN `tarifId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Produit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NULL,
    `montant` INTEGER NOT NULL,
    `parentId` INTEGER NOT NULL,
    `type` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_produitId_key` ON `Ticket`(`produitId`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_tarifId_fkey` FOREIGN KEY (`tarifId`) REFERENCES `TarifEvent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
