const request = require('supertest');
const app = require('../app'); // Ensure correct path to app.js

describe("POST /weather", () => {
  it("should return 400 if cityName is not provided", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City name is required!");
  });

  it("should return 404 if city is not found", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "InvalidCity" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return the weather data for a valid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "London" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("City: London");
  });
});
