import { describe, expect, it, jest } from "@jest/globals";
import app from "../../app.js";
import request from "supertest";

let idResponse;
afterAll(() => {
    process.removeAllListeners();
});

describe("Teste para as rotas GET editoras", () => {

    it("Deve retornar uma lista de editoras", async () => {
        const response = await request(app).get("/editoras").set("Accept", "application/json").expect('Content-Type', /json/).expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
    }),

    it("Deve retornar uma editora por ID", async () => {
        const response = await request(app).get("/editoras/1").set("Accept", "application/json").expect('Content-Type', /json/).expect(200);
        
        expect(response.body).toHaveProperty("id", 1);
    }),

    it("Deve retornar os livros de uma editora", async () => {
        const response = await request(app).get("/editoras/1/livros").set("Accept", "application/json").expect('Content-Type', /json/).expect(200);
        
        expect(Array.isArray(response.body.livros)).toBe(true);
    })
});

describe("Teste para as rotas POST, PUT e DELETE editoras", () => {
    it('Deve cadastrar uma nova editora', async () => {
        const newEditora = { nome: "Editora Teste", cidade: "Cidade Teste", email: "teste@teste.com" };
        const response = await request(app).post("/editoras").send(newEditora).expect('Content-Type', /json/).expect(201);
        
        expect(response.body.content).toHaveProperty("id");

        idResponse = response.body.content.id; 
    }),

    it.each([
        ['nome', {nome: "Editora Atualizada" }], 
        ['cidade', { cidade: "Cidade Atualizada" }],
        ['email', { email: "atualizado@teste.com" }],
    ])("Deve atualizar uma editora existente - campo %s", async (field, params) => {
        
        const requestUpdate = { request };
        const spy = jest.spyOn(requestUpdate, 'request');
        await requestUpdate.request(app).put(`/editoras/${idResponse}`).send(params).expect(204);

        expect(spy).toHaveBeenCalled();
    }),

    it("Deve deletar uma editora existente", async () => {
        await request(app).delete(`/editoras/${idResponse}`).expect(204);
    }),

    it("Deve retornar um erro ao tentar cadastrar uma editora com dados inválidos", async () => {
        const invalidEditora = {};
        const response = await request(app).post("/editoras").send(invalidEditora).expect('Content-Type', /json/).expect(400);
        
        expect(response.body).toHaveProperty("error");
    }),

        it("Deve retornar um erro ao tentar atualizar uma editora com dados inválidos", async () => {
        const invalidEditora = {};
        const response = await request(app).put(`/editoras/${idResponse}`).send(invalidEditora).expect('Content-Type', /json/).expect(400);
        
        expect(response.body).toHaveProperty("error");
    })

});