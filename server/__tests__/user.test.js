const request = require("supertest");
const app = require("../app");
const { mongoConnect, mongoDisconnect } = require("../utils/mongoConnect");

describe("User API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect;
  });

  describe("Test POST /user/signup", () => {
    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/api/user/auth/signup")
        .send({
          name: "test user",
          email: "test@gmail.com",
          phone: 1111111111,
          password: "12345678",
          passwordConfirm: "12345678",
        })
        .expect(201);
    });
  });

  describe("Test POST /user/signup", () => {
    test("It should respond with 400 success", async () => {
      const response = await request(app)
        .post("/api/user/auth/signup")
        .send({
          name: "test user",
          email: "testgmail.com",
          phone: 1111111111,
          password: "1234567",
          passwordConfirm: "123",
        })
        .expect(400);
    });
  });

  describe("Test POST /user/login", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .post("/api/user/auth/login")
        .send({
          email: "test@gmail.com",
          password: "12345678",
        })
        .expect(200);
    });
  });

  describe("Test POST /user/login", () => {
    test("It should respond with 400 success", async () => {
      const response = await request(app)
        .post("/api/user/auth/login")
        .send({
          email: "test1@gmail.com",
          password: "1234578",
        })
        .expect(400);
    });
  });
});
