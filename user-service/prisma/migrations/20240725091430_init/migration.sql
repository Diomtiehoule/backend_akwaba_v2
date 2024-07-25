-- CreateTable
CREATE TABLE `lignProgramme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `dateDebut` VARCHAR(191) NULL,
    `dateFin` VARCHAR(191) NULL,
    `heureDebut` VARCHAR(191) NULL,
    `heureFin` VARCHAR(191) NULL,
    `programme` VARCHAR(191) NULL,
    `programmeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lignProgramme` ADD CONSTRAINT `lignProgramme_programmeId_fkey` FOREIGN KEY (`programmeId`) REFERENCES `Programme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
