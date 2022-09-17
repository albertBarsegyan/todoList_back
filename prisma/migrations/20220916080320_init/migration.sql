/*
  Warnings:

  - You are about to alter the column `name` on the `task_statuses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `VarChar(20)`.
  - You are about to drop the column `user_id` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `users` table. All the data in the column will be lost.
  - Added the required column `email` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `todos_user_id_fkey`;

-- AlterTable
ALTER TABLE `task_statuses` MODIFY `name` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `todos` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(100) NOT NULL,
    ADD COLUMN `is_edited` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `profile_picture`,
    ADD COLUMN `is_admin` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `username` VARCHAR(45) NOT NULL;
