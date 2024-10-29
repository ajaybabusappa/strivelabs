const { sequelize, Sequelize } = require("../utils/db");
const { Models } = require('../models/modelValidations');

const KeyValueModel = Models.KeyValueModel;
const TenantModel = Models.TenantModel;


exports.createKeyValue = async (req, res) => {
    let response = {};
    let request = {
    };

    let body = {
        "key": req.body.key,
        "value": req.body.value,
        "ttl": req.body.ttl,
        "tenant_id": req.id
    }
    const t = await sequelize.transaction();

    if (!req.body.key || !req.body.value) {
        return res.status(400).json({
            "error": "Missing Input Fields"
        });
    }

    try {
        const tenantId = req.id;
        const newKeyValueSize = Buffer.byteLength(JSON.stringify(req.body.value) , 'utf8') + Buffer.byteLength(req.body.key , 'utf8');

        const tenant = await TenantModel.findByPk(tenantId, { transaction: t });
        if (!tenant) {
            await t.rollback();  // Rollback if tenant is not found
            return res.status(404).json({ message: "TENANT_NOT_FOUND" });
        }

        // Check if adding the new key-value pair exceeds the storage limit
        const totalUsage = tenant.current_usage + newKeyValueSize;
        if (totalUsage > tenant.storage_limit) {
            await t.rollback();  // Rollback if storage limit is exceeded
            return res.status(403).json({ message: "STORAGE_LIMIT_EXCEEDED", current_usage: tenant.current_usage, limit: tenant.storage_limit });
        }

        const createdKeyValue = await KeyValueModel.create(body, { transaction: t });

        await TenantModel.increment('current_usage', { by: newKeyValueSize, where: { id: tenantId }, transaction: t });

        await t.commit();
        response.message = "CREATION_SUCCESS";
        // response.created_key_value = createdKeyValue;
        return res.status(201).json({
            response: response,
            //request: request
        });
    } catch (error) {
        console.error(error);
        const errors = {
            error: "INTERNAL_SERVER_ERROR",
            dev_error: error.message
        };
        return res.status(500).json({
            response: response,
            request: request,
            errors: errors
        });
    }
};

exports.getKeyValue = async (req, res) => {
    let response = {};
    let request = {
    };

    const transaction = await sequelize.transaction();

    try {
        const keyValue = await KeyValueModel.findByPk(req.params.key, {
            lock: transaction.LOCK.SHARE,  // Apply the 'FOR SHARE' lock
            transaction                    // Ensure this query is part of the transaction
        });  // Find by primary key

        console.log(keyValue);

        if (!keyValue) {
            response.message = "KEY_NOT_FOUND";
            await transaction.rollback();
            return res.status(404).json({
                response: response,
                request: request,
            });
        }

        if (keyValue.tenant_id !== req.id) {
            response.message = "KEY_DOES_NOT_BELONG_TO_USER";
            await transaction.rollback();
            return res.status(404).json({
                response: response,
                request: request,
            });
        }

        // Check if the TTL has expired
        if (keyValue.ttl !== null) {
            console.log("Checked KeyValue ttl");
            const currentTime = new Date();
            const expiryTime = new Date(keyValue.created_at);
            expiryTime.setSeconds(expiryTime.getSeconds() + keyValue.ttl);  // Add TTL in seconds to created_at

            console.log(expiryTime);
            console.log(currentTime);
            console.log(keyValue.created_at);

            if (currentTime > expiryTime) {
                response.message = "KEY_EXPIRED";
                await transaction.rollback();
                return res.status(404).json({
                    response: response,
                    request: request,
                });
            }
        }

        // If not expired, return the key-value pair
        await transaction.commit();
        response.key_value = keyValue;
        return res.status(200).json({
            "key": keyValue.key,
            "value": keyValue.value 
        });
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        const errors = {
            error: "INTERNAL_SERVER_ERROR",
            dev_error: error.message
        };
        return res.status(500).json({
            response: response,
            request: request,
            errors: errors
        });
    }
};


exports.deleteKeyValue = async (req, res) => {
    let response = {};
    let request = {
        params: req.params,
    };

    const transaction = await sequelize.transaction(); // Start a new transaction

    try {
        // Fetch the key-value pair by the primary key within the transaction
        const keyValue = await KeyValueModel.findByPk(req.params.key, { lock: transaction.LOCK.UPDATE, transaction });

        // If no key found, return a 404
        if (!keyValue) {
            response.message = "KEY_NOT_FOUND";
            await transaction.rollback(); // Rollback if key not found
            return res.status(404).json({
                response: response,
                request: request,
            });
        }

        if (keyValue.tenant_id !== req.id) {
            response.message = "KEY_DOES_NOT_BELONG_TO_USER";
            await transaction.rollback(); // Rollback if key does not belong to user
            return res.status(403).json({
                response: response,
                request: request,
            });
        }

        // Check if the TTL has expired
        if (keyValue.ttl !== null) {
            const currentTime = new Date();
            const expiryTime = new Date(keyValue.created_at);
            expiryTime.setSeconds(expiryTime.getSeconds() + keyValue.ttl); // Add TTL in seconds to created_at

            if (currentTime > expiryTime) {
                response.message = "KEY_EXPIRED";
                await transaction.rollback(); // Rollback if key is expired
                return res.status(404).json({
                    response: response,
                    request: request,
                });
            }
        }

        // Calculate the size of the key-value pair to be deleted
        const valueSize = Buffer.byteLength(JSON.stringify(keyValue.value), 'utf8'); // Size of the JSON value in bytes
        const keySize = Buffer.byteLength(keyValue.key, 'utf8'); // Size of the key in bytes
        const totalSize = keySize + valueSize; // Total size to subtract from current_usage

        // If not expired, proceed to delete
        await KeyValueModel.destroy({ where: { key: req.params.key }, transaction });

        // Update the user's current_usage in tenants_table
        await TenantModel.update(
            { current_usage: Sequelize.literal(`current_usage - ${totalSize}`) }, // Subtract size from current_usage
            { where: { id: keyValue.tenant_id }, transaction, lock: transaction.LOCK.UPDATE } // Include transaction
        );

        await transaction.commit(); // Commit the transaction

        response.message = "DELETION_SUCCESS";
        return res.status(200).json({
            response: response,
            request: request
        });
    } catch (error) {
        await transaction.rollback(); // Rollback on error
        console.error(error);
        const errors = {
            error: "INTERNAL_SERVER_ERROR",
            dev_error: error.message
        };
        return res.status(500).json({
            response: response,
            request: request,
            errors: errors
        });
    }
};


exports.bulkCreateKeyValue = async (req, res) => {
    let response = {};
    let request = {
        body: req.body.length !== 0 ? req.body : undefined,  // Request body should contain an array of key-value pairs
    };

    const transaction = await sequelize.transaction(); // Start a new transaction

    try {
        // Check if the request body is an array
        if (!Array.isArray(req.body) || req.body.length === 0) {
            response.message = "INVALID_REQUEST_BODY";
            return res.status(400).json({
                response: response,
                request: request
            });
        }

        // Fetch the tenant information
        const tenant = await TenantModel.findByPk(req.id, { transaction, lock: transaction.LOCK.UPDATE }); // Assuming req.id contains tenant ID
        if (!tenant) {
            await transaction.rollback(); // Rollback if tenant is not found
            return res.status(404).json({ message: "Tenant not found." });
        }
        const currentUsage = tenant.current_usage;
        const storageLimit = tenant.storage_limit;

        // Set the maximum batch size (200 pairs)
        const batchSize = 200;

        // Check if the request exceeds the batch limit
        if (req.body.length > batchSize) {
            response.message = "TOO_MANY_KEYS";
            response.max_allowed = batchSize;
            await transaction.rollback(); // Rollback on batch size limit exceeded
            return res.status(400).json({
                response: response,
                request: request
            });
        }

        // Calculate the size of all new key-value pairs
        const totalNewSize = req.body.reduce((total, pair) => {
            const valueSize = Buffer.byteLength(JSON.stringify(pair.value), 'utf8'); // Size of the JSON value in bytes
            const keySize = Buffer.byteLength(pair.key, 'utf8'); // Size of the key in bytes
            console.log(valueSize+keySize);
            return total + keySize + valueSize; // Accumulate total size
        }, 0);

        // Check for storage limit
        if (currentUsage + totalNewSize > storageLimit) {
            await transaction.rollback(); // Rollback if storage limit exceeded
            return res.status(403).json({ message: "Storage limit exceeded." });
        }
        
        // Format key-value pairs for bulk creation
        const formattedKeyValuePairs = req.body.map(pair => ({
            key: pair.key,
            value: pair.value,
            ttl: pair.ttl || null,  // Use ttl from the pair or default to null
            tenant_id: req.id,      // Set tenant_id from request
        }));

        // Perform bulk create within transaction
        const createdKeyValues = await KeyValueModel.bulkCreate(formattedKeyValuePairs, {
            ignoreDuplicates: true,  // Optional: Skip duplicates based on the primary key (key)
            transaction,             // Pass the transaction to the query
        });

        // Update tenant's current_usage
        await TenantModel.update(
            { current_usage: currentUsage + totalNewSize },
            { where: { id: req.id }, transaction } // Include transaction
        );

        await transaction.commit(); // Commit the transaction

        response.message = "BULK_CREATION_SUCCESS";
        response.created_key_values = createdKeyValues;
        return res.status(201).json({
            response: response,
            request: request
        });
    } catch (error) {
        await transaction.rollback(); // Rollback on error
        console.error(error);
        const errors = {
            error: "INTERNAL_SERVER_ERROR",
            dev_error: error.message
        };
        return res.status(500).json({
            response: response,
            request: request,
            errors: errors
        });
    }
};

