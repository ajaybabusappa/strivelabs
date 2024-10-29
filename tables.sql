CREATE TABLE tenants_table (
    `id` INT PRIMARY KEY AUTO_INCREMENT,  -- Key as a string, primary key ensures uniqueness
    `username` VARCHAR (255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
	`storage_limit` INT NOT NULL, -- in bytes
    `current_usage` INT DEFAULT 0
);


CREATE TABLE key_value_table (
    `key` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci PRIMARY KEY,  -- Key as a UTF-8 string
    `value` JSON NOT NULL,                                         -- JSON object to store the value
    `ttl` INT NULL,                                                -- Time-to-live, can be NULL if no expiration is needed
    `tenant_id` INT NOT NULL, 
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,              -- Timestamp for when the entry was created
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Auto-updated timestamp
    FOREIGN KEY (`tenant_id`) REFERENCES tenants_table(`id`),
    CHECK (CHAR_LENGTH(`key`) <= 32),                              -- Ensures `key` is max 32 characters
    CHECK (OCTET_LENGTH(`value`) <= 16384)                         -- Ensures `value` JSON object size is within 16 KB (16,384 bytes)
);
