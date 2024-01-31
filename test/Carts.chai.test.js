import { cartModel } from "../src/models/carts.models.js";
import chai from "chai";
import mongoose from "mongoose";
import 'dotenv/config';


const expect = chai.expect

await mongoose.connect(process.env.MONGO_URL);

describe("Testing Carts model CRUD route /api/carts", function () {

    it('Obtener todos los Carts mediante GET', async () => {
        const cart = await cartModel.find()
        expect(Array.isArray(cart)).to.be.ok
    })

    it("Obtener un Cart mediante el metodo GET", async () => {
        const cart = await cartModel.findById('650d9d90c86a122568924819')
        expect(cart).to.have.property("_id")
    })

    it("Crear un nuevo Cart mediante el metodo POST", async () => {
        const cart = await cartModel.create({
            products: []
        })
        expect(cart).to.have.property("products")

      
    })

 
})