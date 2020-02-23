const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  it("should return an OK status code from the index route", async () => {
    const expectedStatusCode = 200;
    const response = await request(server).get("/");
    expect(response.status).toEqual(expectedStatusCode);
  });

  it("should return {data: Working} from the body", async () => {
    const response = await request(server).get("/");
    expect(response.body).toEqual({ data: "Working" });
  });
  it("should return a JSON object from the index route", async () => {
    const response = await request(server).get("/");
    expect(response.type).toEqual("application/json");
  });
});
