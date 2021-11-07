const { Vinos } = require("../src/models");
const supertest = require("supertest");
const app = require("../index");
const request = supertest(app);

let vino = {};

beforeAll(() => {
    Vinos.create({
        name: "vino",
        type: "blanco",
        alcohol_percentage: 12.1,
        is_active: true,
    });
});

describe("Get Vinos", () => {
    it("Get all vinos", async () => {
        const response = await request.get("/api/vinos/");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it("Get one", async () => {
        const response = await request.get("/api/vinos/1");

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
});

describe("Create Vinos", () => {
    it("Post vino", async () => {
        vino = {
            name: "qwert",
            type: "tinto",
            alcohol_percentage: "3.1",
            is_active: true,
        };
        const response = await request.post("/api/vinos/").send(vino);

        expect(response.status).toBe(201);
    });
    it("Failed post", async () => {
        const vino = {
            name: "",
            type: "",
            alcohol_percentage: "",
            is_active: ""
        };
        const response = await request.post("/api/vinos").send(vino);

        expect(response.status).toBe(500);
    });
});

describe("Soft-deleted", () => {
    it("Relete vino", async () => {
        const response = await request.delete("/api/vinos/1");

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expect.objectContaining({
            success: expect.any(Boolean),
          }),)
    });
    it("Restore vino", async () => {
        const response = await request.get("/api/vinos/1/restore");

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expect.objectContaining({
            restore: expect.any(Boolean),
          }),)
    });
});
