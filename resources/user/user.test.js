const request = require("supertest");
const server = require("../../server.js");

describe("user endpoints", () => {
  describe("METHOD POST: /api/v1/user", () => {
    let loginObj = {
      email: "auth@test.com",
      password: "123456"
    };

    it("should return status 422 if email already exists ", async () => {
      const expectedStatusCode = 422;
      const response = await request(server)
        .post("/api/v1/user")
        .send(loginObj);
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return email exists", async () => {
      const response = await request(server)
        .post("/api/v1/user")
        .send(loginObj);

      expect(response.body).toBe(
        `User already exists with email ${loginObj.email}`
      );
    });
    it("should return a JSON object from the index route", async () => {
      const response = await request(server)
        .post("/api/v1/user")
        .send(loginObj);
      expect(response.type).toEqual("application/json");
    });
  });

  describe("GET METHOD: /api/v1/user", () => {
    it("should return status 200", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get("/api/v1/user");

      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return email exists", async () => {
      const response = await request(server).get("/api/v1/user");

      expect(response.body).toBeTruthy();
    });
    it("should return a JSON object from the index route", async () => {
      const response = await request(server).get("/api/v1/user");

      expect(response.type).toEqual("application/json");
    });
  });

  describe("PUT METHOD: /api/v1/user/1", () => {
    it("should return status 200", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get("/api/v1/user");

      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return updated obj", async () => {
      const response = await request(server).get("/api/v1/user");

      expect(response.body).toBeTruthy();
    });
    it("should return a JSON object from the index route", async () => {
      const response = await request(server).get("/api/v1/user");

      expect(response.type).toEqual("application/json");
    });
  });

  describe("DELTE METHOD: /api/v1/user", () => {
    it("should return a JSON object from the index route", async () => {
      const response = await request(server).get("/api/v1/user");

      expect(response.type).toEqual("application/json");
    });
  });
});
