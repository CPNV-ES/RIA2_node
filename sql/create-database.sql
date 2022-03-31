SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

USE `ria2node` ;

-- -----------------------------------------------------
-- Table `ria2node`.`image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ria2node`.`image` ;

CREATE TABLE IF NOT EXISTS `ria2node`.`image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(2048) NULL,
  `name` VARCHAR(255) NULL,
  `hash` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ria2node`.`analyse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ria2node`.`analyse` ;

CREATE TABLE IF NOT EXISTS `ria2node`.`analyse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image_id` INT NOT NULL,
  `ip` BINARY(4) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_analyse_image`
    FOREIGN KEY (`image_id`)
    REFERENCES `ria2node`.`image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_analyse_image_idx` ON `ria2node`.`analyse` (`image_id` ASC);


-- -----------------------------------------------------
-- Table `ria2node`.`object`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ria2node`.`object` ;

CREATE TABLE IF NOT EXISTS `ria2node`.`object` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `analyse_id` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `category` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_object_analyse1`
    FOREIGN KEY (`analyse_id`)
    REFERENCES `ria2node`.`analyse` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_object_analyse1_idx` ON `ria2node`.`object` (`analyse_id` ASC);


-- -----------------------------------------------------
-- Table `ria2node`.`attribute`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ria2node`.`attribute` ;

CREATE TABLE IF NOT EXISTS `ria2node`.`attribute` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `object_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `value_type` ENUM('string', 'number', 'boolean') NULL,
  `value_string` VARCHAR(255) NULL,
  `value_number` FLOAT NULL,
  `value_boolean` TINYINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_attribute_object1`
    FOREIGN KEY (`object_id`)
    REFERENCES `ria2node`.`object` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_attribute_object1_idx` ON `ria2node`.`attribute` (`object_id` ASC) ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;