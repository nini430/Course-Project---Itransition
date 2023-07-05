-- AlterTable
ALTER TABLE `user` ADD COLUMN `status` ENUM('active', 'blocked', 'deleted') NOT NULL DEFAULT 'active';
