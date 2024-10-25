const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');  // Adjust the path as needed
const { Models } = require('../models/modelValidations'); // Mock models

// Set up JWT secret (same as in your auth service)
const jwtSecret = "1246YTYYY";

// Mock the database models
jest.mock('../models/modelValidations', () => ({
  Models: {
    TenantModel: {
      findByPk: jest.fn(),
      increment: jest.fn(),
      update: jest.fn(),
    },
    KeyValueModel: {
      create: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      bulkCreate: jest.fn(),
    },
  },
}));

// Helper function to generate token
const generateToken = (id, username) => {
  return jwt.sign({ id, username }, jwtSecret, { expiresIn: '1h' });
};

describe("Key-Value API Tests", () => {
  let token;
  beforeEach(() => {
    token = `Bearer ${generateToken(1, 'testUser')}`;
  });

  // Test Suite for `createKeyValue`
  describe("POST /api/object/", () => {
    it("should create a new key-value pair successfully", async () => {
      Models.TenantModel.findByPk.mockResolvedValue({ current_usage: 100, storage_limit: 1000 });
      Models.KeyValueModel.create.mockResolvedValue({
        key: 'sampleKey',
        value: 'sampleValue',
        tenant_id: 1
      });
      Models.TenantModel.increment.mockResolvedValue();

      const response = await request(app)
        .post("/api/object/")
        .set("Authorization", token)
        .send({ key: "sampleKey", value: "sampleValue" });

      expect(response.statusCode).toBe(201);
      expect(response.body.response.message).toBe("CREATION_SUCCESS");
      expect(response.body.response.created_key_value).toHaveProperty("key", "sampleKey");
    });

    it("should return 403 when storage limit is exceeded", async () => {
        Models.TenantModel.findByPk.mockResolvedValue({ current_usage: 990, storage_limit: 1000 });
  
        const response = await request(app)
          .post("/api/object/")
          .set("Authorization", token)
          .send({ key: "largeKey", value: "largeValue" });
  
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toBe("STORAGE_LIMIT_EXCEEDED");
      });

      it("should return 404 if tenant is not found", async () => {
        // Mock the database to return null for the tenant lookup
        Models.TenantModel.findByPk.mockResolvedValue(null);
    
        const response = await request(app)
          .post("/api/object")
          .set("Authorization", token)
          .send({
            key: "sampleKey",
            value: "sampleValue"
          });
    
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("TENANT_NOT_FOUND");
      });
  });

  describe("GET /api/object/:key", () => {
    it("should retrieve a key-value pair successfully", async () => {
      Models.KeyValueModel.findByPk.mockResolvedValue({
        key: 'sampleKey',
        value: 'sampleValue',
        tenant_id: 1,
        ttl: null,
        created_at: new Date()
      });

      const response = await request(app)
        .get("/api/object/sampleKey")
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.body.response.message).toBe("FETCH_SUCCESS");
      expect(response.body.response.key_value).toHaveProperty("key", "sampleKey");
    });

    it("should return 404 when key does not exist", async () => {
      Models.KeyValueModel.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .get("/api/object/nonExistentKey")
        .set("Authorization", token);

      expect(response.statusCode).toBe(404);
      expect(response.body.response.message).toBe("KEY_NOT_FOUND");
    });

    it("should return 404 when key TTL has expired", async () => {
        const expiredDate = new Date();
        expiredDate.setSeconds(expiredDate.getSeconds() - 60); // Set created_at to a time in the past
    
        Models.KeyValueModel.findByPk.mockResolvedValue({
          key: 'sampleKey',
          value: 'sampleValue',
          tenant_id: 1,
          ttl: 30, // TTL of 30 seconds, which has expired
          created_at: expiredDate
        });
    
        const response = await request(app)
          .get("/api/object/sampleKey")
          .set("Authorization", token);
    
        expect(response.statusCode).toBe(404);
        expect(response.body.response.message).toBe("KEY_EXPIRED");
      });
    
      it("should return 403 when key does not belong to the user", async () => {
        Models.KeyValueModel.findByPk.mockResolvedValue({
          key: 'sampleKey',
          value: 'sampleValue',
          tenant_id: 2, // Tenant ID that does not match the user's ID
          ttl: null,
          created_at: new Date()
        });
    
        const response = await request(app)
          .get("/api/object/sampleKey")
          .set("Authorization", token);
    
        expect(response.statusCode).toBe(404);
        expect(response.body.response.message).toBe("KEY_DOES_NOT_BELONG_TO_USER");
      });
  });

  // Test Suite for `deleteKeyValue`
  describe("DELETE /api/object/:key", () => {
    it("should delete a key-value pair successfully", async () => {
      Models.KeyValueModel.findByPk.mockResolvedValue({
        key: 'sampleKey',
        value: 'sampleValue',
        tenant_id: 1,
        ttl: null,
        created_at: new Date()
      });
      Models.KeyValueModel.destroy.mockResolvedValue('sampleKey');
      Models.TenantModel.update.mockResolvedValue();

      const response = await request(app)
        .delete("/api/object/sampleKey")
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);
      expect(response.body.response.message).toBe("DELETION_SUCCESS");
    });

    it("should return 404 when key does not exist", async () => {
      Models.KeyValueModel.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .delete("/api/object/nonExistentKey")
        .set("Authorization", token);

      expect(response.statusCode).toBe(404);
      expect(response.body.response.message).toBe("KEY_NOT_FOUND");
    });

    it("should return 404 when key TTL has expired", async () => {
        const expiredDate = new Date();
        expiredDate.setSeconds(expiredDate.getSeconds() - 60); // Set created_at to 1 minute in the past
    
        Models.KeyValueModel.findByPk.mockResolvedValue({
          key: 'sampleKey',
          value: 'sampleValue',
          tenant_id: 1,
          ttl: 30, // TTL of 30 seconds, which has expired
          created_at: expiredDate
        });
    
        const response = await request(app)
          .delete("/api/object/sampleKey")
          .set("Authorization", token);
    
        expect(response.statusCode).toBe(404);
        expect(response.body.response.message).toBe("KEY_EXPIRED");
      });
    
      it("should return 403 when key does not belong to the user", async () => {
        Models.KeyValueModel.findByPk.mockResolvedValue({
          key: 'sampleKey',
          value: 'sampleValue',
          tenant_id: 2, // Tenant ID that does not match the user's ID
          ttl: null,
          created_at: new Date()
        });
    
        const response = await request(app)
          .delete("/api/object/sampleKey")
          .set("Authorization", token);
    
        expect(response.statusCode).toBe(403);
        expect(response.body.response.message).toBe("KEY_DOES_NOT_BELONG_TO_USER");
      });
  });








  // Test Suite for `bulkCreateKeyValue`
  describe("POST /api/batch/object", () => {
    it("should create multiple key-value pairs successfully", async () => {
      Models.TenantModel.findByPk.mockResolvedValue({ current_usage: 100, storage_limit: 1000 });
      Models.KeyValueModel.bulkCreate.mockResolvedValue([{ key: 'key1', value: 'value1', tenant_id: 1 }]);
      Models.TenantModel.update.mockResolvedValue();

      const response = await request(app)
        .post("/api/batch/object")
        .set("Authorization", token)
        .send([{ key: "key1", value: "value1" }, { key: "key2", value: "value2" }]);

      expect(response.statusCode).toBe(201);
      expect(response.body.response.message).toBe("BULK_CREATION_SUCCESS");
    });

    it("should return 400 when request body is invalid", async () => {
      const response = await request(app)
        .post("/api/batch/object")
        .set("Authorization", token)
        .send({ key: "singleKey", value: "singleValue" }); // Not an array

      expect(response.statusCode).toBe(400);
      expect(response.body.response.message).toBe("INVALID_REQUEST_BODY");
    });
  });

  it("should return 404 when tenant is not found", async () => {
    Models.TenantModel.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/batch/object")
      .set("Authorization", token)
      .send([{ key: "key1", value: "value1" }]);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Tenant not found.");
  });

  it("should return 400 when batch size exceeds limit", async () => {
    Models.TenantModel.findByPk.mockResolvedValue({ current_usage: 100, storage_limit: 1000 });
    const largePayload = Array.from({ length: 201 }, (_, i) => ({ key: `key${i}`, value: `value${i}` })); // 201 items

    const response = await request(app)
      .post("/api/batch/object")
      .set("Authorization", token)
      .send(largePayload);

    expect(response.statusCode).toBe(400);
    expect(response.body.response.message).toBe("TOO_MANY_KEYS");
    expect(response.body.response.max_allowed).toBe(200);
  });

  it("should return 400 when storage limit is exceeded", async () => {
    Models.TenantModel.findByPk.mockResolvedValue({ current_usage: 900, storage_limit: 1000 });
    const oversizedPayload = [{ key: "largeKey", value: "a".repeat(200) }]; // Exceeds remaining limit of 100 bytes

    const response = await request(app)
      .post("/api/batch/object")
      .set("Authorization", token)
      .send(oversizedPayload);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Storage limit exceeded.");
  });
});
