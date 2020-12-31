-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table `languages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `languages` (
  `id` BIGINT(20) NOT NULL,
  `language` VARCHAR(100) NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `language_UNIQUE` (`language` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clients` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` VARCHAR(100) NOT NULL COMMENT 'クライアント名',
  `type` VARCHAR(100) NOT NULL COMMENT 'クライアンタイプ',
  `language_type` BIGINT(20) NOT NULL,
  `parent_type` BIGINT NOT NULL,
  `parent_client_id` BIGINT NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `client_roles_UNIQUE` (`name` ASC),
  INDEX `fk_clients_languages1_idx` (`language_type` ASC),
  CONSTRAINT `fk_clients_languages1`
    FOREIGN KEY (`language_type`)
    REFERENCES `languages` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `category_type` VARCHAR(50) NOT NULL COMMENT 'カテゴリータイプ',
  `campaign_category_name` VARCHAR(100) NOT NULL COMMENT 'カテゴリ名',
  `client_id` BIGINT(20) NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `categories_UNIQUE` (`category_type` ASC, `campaign_category_name` ASC),
  INDEX `fk_categories_clients1_idx` (`client_id` ASC),
  CONSTRAINT `fk_categories_clients1`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `product_name` VARCHAR(200) NOT NULL COMMENT '商品名',
  `client_id` BIGINT(20) NOT NULL COMMENT 'クライアントID',
  `category_id` BIGINT(20) NOT NULL COMMENT 'カテゴリ',
  `company_name` VARCHAR(100) NOT NULL COMMENT '企業名',
  `price` VARCHAR(100) NOT NULL COMMENT '価格',
  `url` VARCHAR(200) NOT NULL COMMENT 'URL',
  `description` TEXT NULL DEFAULT NULL COMMENT '商品説明(HTML)',
  `memo` TEXT NULL DEFAULT NULL COMMENT 'メモ',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `products_UNIQUE` (`product_name` ASC, `client_id` ASC, `category_id` ASC, `company_name` ASC),
  INDEX `fk_products_categories1_idx` (`category_id` ASC),
  INDEX `fk_products_clients1_idx` (`client_id` ASC),
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_clients1`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `scenarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scenarios` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `scenario_name` VARCHAR(200) NOT NULL COMMENT 'シナリオ名',
  `client_id` BIGINT(20) NOT NULL COMMENT 'クライアントID',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `scenarios_UNIQUE` (`scenario_name` ASC, `client_id` ASC),
  INDEX `fk_scenarios_clients1_idx` (`client_id` ASC),
  CONSTRAINT `fk_scenarios_clients1`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `campaigns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `campaign_name` VARCHAR(200) NOT NULL COMMENT 'キャンペーン名',
  `client_id` BIGINT(20) NOT NULL COMMENT 'クライアントID',
  `category_id` BIGINT(20) NOT NULL COMMENT 'カテゴリ',
  `start_date` DATETIME NOT NULL COMMENT '開始日',
  `end_date` DATETIME NOT NULL COMMENT '終了日',
  `content` TEXT NULL DEFAULT NULL COMMENT '内容',
  `scenario` BIGINT(20) NULL DEFAULT NULL COMMENT 'シナリオ',
  `status` VARCHAR(50) NULL DEFAULT NULL COMMENT 'ステータス',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `campaigns_UNIQUE` (`campaign_name` ASC, `client_id` ASC),
  INDEX `fk_campaigns_scenarios1_idx` (`scenario` ASC),
  INDEX `fk_campaigns_clients1_idx` (`client_id` ASC),
  INDEX `fk_campaigns_categories1_idx` (`category_id` ASC),
  CONSTRAINT `fk_campaigns_scenarios1`
    FOREIGN KEY (`scenario`)
    REFERENCES `scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaigns_clients1`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaigns_categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `campaign_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `campaign_products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `campaign_id` BIGINT(20) NOT NULL COMMENT 'キャンペーン商品ID',
  `product_id` BIGINT(20) NOT NULL COMMENT '商品',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `campaign_products_UNIQUE` (`campaign_id` ASC, `product_id` ASC),
  INDEX `fk_campaign_products_products1_idx` (`product_id` ASC),
  CONSTRAINT `fk_campaign_products_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaign_products_campaigns1`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `campaigns` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stores` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `store_name` VARCHAR(200) NOT NULL COMMENT 'ストア名',
  `client_id` BIGINT(20) NOT NULL COMMENT 'クライアントID',
  `address` VARCHAR(200) NOT NULL COMMENT '住所',
  `officer` VARCHAR(100) NULL DEFAULT NULL COMMENT '担当者',
  `contact_information` VARCHAR(100) NULL DEFAULT NULL COMMENT '連絡先',
  `memo` TEXT NULL DEFAULT NULL COMMENT 'メモ',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `stores_UNIQUE` (`store_name` ASC, `client_id` ASC),
  INDEX `fk_stores_clients1_idx` (`client_id` ASC),
  CONSTRAINT `fk_stores_clients1`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `campaign_stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `campaign_stores` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `campaign_id` BIGINT(20) NOT NULL COMMENT 'キャンペーンストアID',
  `store_id` BIGINT(20) NOT NULL COMMENT '店舗',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `campaign_stores_UNIQUE` (`campaign_id` ASC, `store_id` ASC),
  UNIQUE INDEX `campaign_id_UNIQUE` (`campaign_id` ASC),
  INDEX `fk_campaign_stores_stores1_idx` (`store_id` ASC),
  CONSTRAINT `fk_campaign_stores_campaigns1`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `campaigns` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campaign_stores_stores1`
    FOREIGN KEY (`store_id`)
    REFERENCES `stores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `display_accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `display_accounts` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `account` VARCHAR(100) NOT NULL COMMENT 'account',
  `store_id` BIGINT(20) NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `display_accounts_UNIQUE` (`account` ASC, `store_id` ASC),
  INDEX `fk_display_accounts_stores1_idx` (`store_id` ASC),
  CONSTRAINT `fk_display_accounts_stores1`
    FOREIGN KEY (`store_id`)
    REFERENCES `stores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `product_imgs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_imgs` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `product_id` BIGINT(20) NOT NULL COMMENT '商品画像ID',
  `img` VARCHAR(200) NOT NULL COMMENT '画像',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `product_imgs_UNIQUE` (`product_id` ASC, `img` ASC),
  CONSTRAINT `fk_product_imgs_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `salespersons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salespersons` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` VARCHAR(100) NOT NULL COMMENT '氏名',
  `client_id` BIGINT(20) NOT NULL COMMENT 'クライアントID',
  `evaluation` VARCHAR(10) NOT NULL COMMENT '評価',
  `company` VARCHAR(100) NOT NULL COMMENT '所属会社',
  `contact_information` VARCHAR(200) NULL DEFAULT NULL COMMENT '連絡先',
  `officer` VARCHAR(100) NULL DEFAULT NULL COMMENT '担当者',
  `area` VARCHAR(200) NULL DEFAULT NULL COMMENT '担当エリア',
  `specialty_category` VARCHAR(200) NULL DEFAULT NULL COMMENT '得意分野',
  `memo` TEXT NULL DEFAULT NULL COMMENT 'メモ',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `salespersons_UNIQUE` (`name` ASC, `client_id` ASC),
  INDEX `fk_salespersons_clients1_idx` (`client_id` ASC),
  CONSTRAINT `fk_salespersons_clients1`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `scenario_trees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scenario_trees` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `scenario_id` BIGINT(20) NOT NULL COMMENT 'シナリオ名',
  `scenario_type` VARCHAR(100) NOT NULL COMMENT 'シナリオタイプ',
  `disp_value` VARCHAR(100) NOT NULL COMMENT 'ノード名',
  `value` VARCHAR(100) NOT NULL COMMENT 'バリュー',
  `parent_id` BIGINT(20) NOT NULL COMMENT 'ペアレントID',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `scenario_trees_UNIQUE` (`scenario_id` ASC, `scenario_type` ASC, `disp_value` ASC, `parent_id` ASC),
  CONSTRAINT `fk_scenario_trees_scenarios1`
    FOREIGN KEY (`scenario_id`)
    REFERENCES `scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `store_salespersons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store_salespersons` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `store_id` BIGINT(20) NOT NULL COMMENT 'ストアID',
  `salesperson_id` BIGINT(20) NOT NULL COMMENT '販売員',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `store_salespersons_UNIQUE` (`store_id` ASC, `salesperson_id` ASC),
  INDEX `fk_store_salespersons_salespersons1_idx` (`salesperson_id` ASC),
  CONSTRAINT `fk_store_salespersons_stores1`
    FOREIGN KEY (`store_id`)
    REFERENCES `stores` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_store_salespersons_salespersons1`
    FOREIGN KEY (`salesperson_id`)
    REFERENCES `salespersons` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tablet_accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tablet_accounts` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `account` VARCHAR(100) NOT NULL COMMENT 'account',
  `store_id` BIGINT(20) NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tablet_accounts_UNIQUE` (`account` ASC, `store_id` ASC),
  INDEX `fk_tablet_accounts_stores1_idx` (`store_id` ASC),
  CONSTRAINT `fk_tablet_accounts_stores1`
    FOREIGN KEY (`store_id`)
    REFERENCES `stores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `admin_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `account` VARCHAR(100) NOT NULL COMMENT 'account',
  `name` VARCHAR(100) NULL,
  `client_id` BIGINT NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_UNIQUE` (`account` ASC, `client_id` ASC),
  INDEX `fk_admin_users_clients1_idx` (`client_id` ASC),
  CONSTRAINT `fk_admin_users_clients1`
    FOREIGN KEY (`client_id`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `scenario_initial_movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scenario_initial_movies` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `scenario_id` BIGINT(20) NOT NULL,
  `movie_1st` VARCHAR(500) NOT NULL,
  `movie_2nd` VARCHAR(500) NOT NULL,
  `percentage` INT NOT NULL,
  `movie_1st_count` INT NULL,
  `movie_2nd_count` INT NULL,
  `updated_by` VARCHAR(100) NOT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_scenario_initial_movies_scenarios1_idx` (`scenario_id` ASC),
  CONSTRAINT `fk_scenario_initial_movies_scenarios1`
    FOREIGN KEY (`scenario_id`)
    REFERENCES `scenarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logs` (
  `id` BIGINT NOT NULL,
  `log_code` VARCHAR(100) NOT NULL,
  `user` VARCHAR(100) NOT NULL,
  `store_id` BIGINT NULL,
  `message` VARCHAR(200) NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sale_areas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sale_areas` (
  `id` BIGINT(20) NOT NULL,
  `client_id` BIGINT(20) NOT NULL,
  `area` VARCHAR(100) NOT NULL,
  `updated_by` VARCHAR(100) NOT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sale_area_INDEX` (`client_id` ASC, `area` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `salespersons_areas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `salespersons_areas` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `salesperson_id` BIGINT(20) NOT NULL COMMENT 'ストアID',
  `sale_area_id` BIGINT(20) NOT NULL COMMENT '販売員',
  `updated_by` VARCHAR(100) NOT NULL COMMENT '更新者',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  `created_by` VARCHAR(100) NOT NULL COMMENT '登録者',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `salesperson_areas_UNIQUE` (`salesperson_id` ASC, `sale_area_id` ASC),
  INDEX (`sale_area_id` ASC),
  CONSTRAINT `fk_salespersons_areas_salespersons1`
    FOREIGN KEY (`salesperson_id`)
    REFERENCES `salespersons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_salespersons_areas_sale_areas1`
    FOREIGN KEY (`sale_area_id`)
    REFERENCES `sale_areas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
