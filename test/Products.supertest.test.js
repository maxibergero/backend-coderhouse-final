import chai from "chai";
import mongoose from "mongoose";
import 'dotenv/config';
import supertest from "supertest";
import { userModel } from "../src/models/users.models.js";
import { generateToken } from "../src/utils/jwt.js";
import { productModel } from "../src/models/products.models.js";



const expect = chai.expect

const request = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL)

const userTest = await userModel.findById("657b6060688019a810eda02d")

const tokenTest = generateToken(userTest)

let idProductTest = ""

describe("Testing products model CRUD route /api/products", function () {

    it("Obtener todos los productos mediante GET", async () => {
        const products = await request
            .get('/api/products')
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(products.statusCode).to.equal(200)
    })

    it("Obtener un producto mediante método GET", async () => {
        const product = await request
            .get(`/api/products/65061db22d8ffc4d8b01e5e4`)
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(product.statusCode).to.equal(200)
    })

    it("Crear un nuevo producto mediante método POST", async () => {
        const product = await request
            .post('/api/products')
            .send({
                name: "supertest",
                description: "supertest",
                code: "supertest",
                thumbnail: "supertest",
                price: 30,
                stock: 30,
                category: "supertest",
                title: "supertest"
            })
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(product.statusCode).to.equal(201)

        const productNew = await productModel.findOne({ code: "supertest" })
        idProductTest = productNew._id.toString()
    })

    it("Actualizar un producto mediante el método PUT", async () => {
        const product = await request
            .put(`/api/products/${idProductTest}`)
            .send({
                name: "supertest",
                description: "supertest",
                code: "supertest",
                thumbnail: "supertest",
                price: 30,
                stock: 30,
                category: "supertest",
                title: "supertest"
            })
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(product.statusCode).to.equal(200)
    })

    it("Eliminar un producto mediante el método DELETE", async () => {
        const product = await request
            .delete(`/api/products/${idProductTest}`)
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(product.statusCode).to.equal(200)
    })



    

 

})