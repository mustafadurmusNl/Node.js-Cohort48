const request = require("supertest");

const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.status(200).json({ name: "John" });
});
describe("GET /user", () => {
  it("responds wih json", (done) => {
    request(app)
      .get("/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
