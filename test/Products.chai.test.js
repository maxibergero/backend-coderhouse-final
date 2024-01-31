import { productModel } from "../src/models/products.models.js";
import chai from "chai";
import mongoose from "mongoose";
import 'dotenv/config';



let idProductTest = "";

const expect = chai.expect;

await mongoose.connect(process.env.MONGO_URL);

describe("Testing Products model CRUD route /api/products", function () {

    it("Obtener todos los productos mediante GET", async () => {
        const product = await productModel.find()
        expect(Array.isArray(product)).to.be.ok
    })

    it("Obtener un producto mediante método GET", async () => {
        const product = await productModel.findById('65061db22d8ffc4d8b01e5e4')
        expect(product).to.have.property("_id")
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
        expect(product).to.have.property("_id")

        idProductTest = product._id.toString()
    })

    it("Eliminar un producto mediante método DELETE", async() =>{
        const product = await productModel.findByIdAndDelete(idProductTest)
        expect(product).to.have.property("_id")
    })

    it("Actualizar un producto mediante método PUT", async () => {
        const product = await productModel.findByIdAndUpdate("65061db22d8ffc4d8b01e5e4", {
            name: "testUpdate99",
            description: "testUpdate",
            code: "testUpdate",
            thumbnail: "testUpdate",
            price: 30,
            stock: 30,
            category: "testUpdate",
            title: "testUpdate"
        })
        expect(product).to.have.property("_id")
    })
})