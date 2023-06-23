const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoDisconnect } = require("../utils/mongoConnect");

describe("Products API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect;
  });

  describe("Test GET /products", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/api/products/products")
        .expect(200);
    });
  });

  describe("Test GET /products/id", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/api/products/643c195d93c12a6d07a73d5d")
        .expect(200);
    });
  });

  describe("Test POST /products/createProduct", () => {
    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/api/products/createProduct")
        .send({
          type: "scooter",
          details: {
            title: "test product",
            description: "test description",
            model: "BMX",
            electric: true,
            speed: 20,
            battery: 45,
            helmet: true,
          },
          location: {
            city: "holon",
            street: "megido",
            houseNumber: 3,
          },
          price: {
            dailyPrice: 30,
            hourPrice: "5",
          },
          images: [
            "https://media.wired.com/photos/61afb905d184762c75e00411/master/pass/Gear-Jackbrabbit-Bike-Yellow-top.jpg",
          ],
          user: "643c140393c12a6d07a73d51",
        })
        .expect(201);
    });
  });

  describe("Test PATCH /products/id", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .patch("/api/products/64424928781f7711ad389e41")
        .send({
          details: {
            title: "new test product",
          },
        })
        .expect(200);
    });
  });
});
