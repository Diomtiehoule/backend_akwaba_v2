/*
  Warnings:

  - You are about to drop the column `number` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `user_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `number`,
    DROP COLUMN `role`,
    DROP COLUMN `status`,
    DROP COLUMN `username`,
    ADD COLUMN `role_id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `email` VARCHAR(191) NULL;
