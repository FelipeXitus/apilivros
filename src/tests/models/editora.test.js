import { describe, expect, it, jest } from "@jest/globals";
import Editora from "../../models/editora.js";

describe("Teste para o modelo Editora", () => {
    const objetoEditora = new Editora({
        nome: "Editora Exemplo",
        cidade: "São Paulo",
        email: "c@c.com",
    });

    it("Deve criar uma instância de Editora com os atributos corretos", () => {
        const editora = new Editora(objetoEditora);

        expect(editora).toEqual(expect.objectContaining(objetoEditora));
    }),

    it.skip("Deve salvar editora no banco de dados", async () => {
        const editora = new Editora(objetoEditora);
        const editoraSalva = await editora.salvar();
        const editoraEncontrada = await Editora.pegarPeloId(editoraSalva.id);

        expect(editoraEncontrada).toEqual(
            expect.objectContaining({
                ...objetoEditora,
                id: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );
    })

    it("Deve fazer uma chamada simulada para salvar editora no banco de dados", async () => {
        const editora = new Editora(objetoEditora);
 
        editora.salvar = jest.fn().mockResolvedValue({
            ...objetoEditora,
            id: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });
        const editoraSalva = await editora.salvar();

        expect(editora.salvar).toHaveBeenCalled();
        expect(editoraSalva).toEqual(
            expect.objectContaining({
                ...objetoEditora,
                id: expect.any(Number),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );


    })

});
