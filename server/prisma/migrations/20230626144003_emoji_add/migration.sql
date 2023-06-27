-- CreateTable
CREATE TABLE `ItemReaction` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('like', 'love', 'haha', 'wow', 'angry', 'sad') NOT NULL DEFAULT 'like',
    `userId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentReaction` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('like', 'love', 'haha', 'wow', 'angry', 'sad') NOT NULL DEFAULT 'like',
    `userId` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemReaction` ADD CONSTRAINT `ItemReaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemReaction` ADD CONSTRAINT `ItemReaction_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReaction` ADD CONSTRAINT `CommentReaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReaction` ADD CONSTRAINT `CommentReaction_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
