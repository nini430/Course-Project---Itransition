-- AlterTable
ALTER TABLE `user` ADD COLUMN `hashedForgotPasswordToken` VARCHAR(191) NULL,
    ADD COLUMN `hashedForgotPasswordTokenExpire` DATETIME(3) NULL;
