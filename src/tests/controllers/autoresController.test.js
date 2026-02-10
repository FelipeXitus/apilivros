import AutoresController from "../../controllers/autoresController.js";
import { jest } from "@jest/globals";

describe("Teste para o controller de autores", () => {

    it("Deve retornar uma lista de autores", async () => {
    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    await AutoresController.listarAutores(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(Array.isArray(res.json.mock.calls[0][0])).toBe(true);
});


});