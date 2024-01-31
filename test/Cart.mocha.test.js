import { cartModel } from "../src/models/carts.models.js";
import Assert from "assert";
import mongoose from "mongoose";
import 'dotenv/config';



let idCartTest = "";

const assert = Assert.strict;

await mongoose.connect(process.env.MONGO_URL);


describe("Testing Carts model CRUD route /api/carts", function () {

    it('Obtener todos los Carts mediante GET', async () => {
        const cart = await cartModel.find()
        assert.strictEqual(Array.isArray(cart), true)
    })

    it("Obtener un Cart mediante el metodo GET", async () => {
        const cart = await cartModel.findById('650d9d90c86a122568924819')
        assert.ok(cart._id)
    })

    it("Crear un nuevo Cart mediante el metodo POST", async () => {
        const cart = await cartModel.create({
            products: []
        })
        assert.ok(cart._id)
        idCartTest = cart._id.toString()
    })

    it("Eliminar un Cart mediante el metodo DELETE", async () => {
        const cart = await cartModel.findByIdAndDelete(idCartTest)
        assert.ok(cart._id)
    })
})
