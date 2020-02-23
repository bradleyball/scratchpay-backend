const request = require("supertest");
const server = require("../../server.js");

describe("auth endpoints", () => {
  describe("/api/v1/login", () => {
    let loginObj = {
      email: "auth@test.com",
      password: "123456"
    };

    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;
      const response = await request(server)
        .post("/api/v1/auth/login/")
        .send(loginObj);
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a token", async () => {
      const response = await request(server)
        .post("/api/v1/auth/login/")
        .send(loginObj);
      expect(response.body.token).toBeTruthy();
    });
    it("should return a JSON object from the index route", async () => {
      const response = await request(server)
        .post("/api/v1/auth/login/")
        .send(loginObj);
      expect(response.type).toEqual("application/json");
    });
  });

  describe("/api/v1/signup", () => {
    let loginObj = {
      email: "auth@test.com",
      password: "123456"
    };
    it("should return status 422 if email already exists ", async () => {
      const expectedStatusCode = 422;
      const response = await request(server)
        .post("/api/v1/auth/signup/")
        .send(loginObj);
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return email exists", async () => {
      const response = await request(server)
        .post("/api/v1/auth/signup/")
        .send(loginObj);

      expect(response.body).toBe(
        `User already exists with email ${loginObj.email}`
      );
    });
    it("should return a JSON object from the index route", async () => {
      const response = await request(server)
        .post("/api/v1/auth/signup/")
        .send(loginObj);
      expect(response.type).toEqual("application/json");
    });
  });
});
