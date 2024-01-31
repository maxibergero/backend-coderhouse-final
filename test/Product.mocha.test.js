import { productModel } from "../src/models/products.models.js";
import Assert from "assert";
import mongoose from "mongoose";
import 'dotenv/config';

const assert = Assert.strict;

let idProductTest = "";

await mongoose.connect(process.env.MONGO_URL);


describe('Testing products model CRUD route /api/products', function () {

    
    it('Obtener todos los productos mediante GET', async () => {
        const product = await productModel.find()
        assert.strictEqual(Array.isArray(product), true)
    })

    it('Obtener un producto mediante método GET', async () => {
        const product = await productModel.findById('65061db22d8ffc4d8b01e5e4')
        assert.ok(product._id)
    })

    it("Crear un nuevo producto mediante el metodo POST", async () => {
        const product = await productModel.create({
            name: "test",
            description: "test",
            code: "test",
            thumbnail: "test",
            price: 30,
            stock: 30,
            category: "test",
            title: "test"
        })  
        assert.ok(product._id)

        idProductTest = product._id.toString()
    })


    it("Eliminar un producto mediante el metodo DELETE", async () => {
        const product = await productModel.findByIdAndDelete(idProductTest)
        assert.ok(product._id)
    })

    it("Actualizar un producto mediante el método PUT", async() => {
        const product = await productModel.findByIdAndUpdate("65061db22d8ffc4d8b01e5e4", {
            name: "testUpdate1",
            description: "testUpdate",
            code: "testUpdate",
            thumbnail: "testUpdate",
            price: 30,
            stock: 30,
            category: "testUpdate",
            title: "testUpdate"
        })
        assert.ok(product._id)
    })
})



