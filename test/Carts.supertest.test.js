import chai from "chai";
import mongoose from "mongoose";
import 'dotenv/config';
import supertest from "supertest";
import { userModel } from "../src/models/users.models.js";
import { generateToken } from "../src/utils/jwt.js";
import { productModel } from "../src/models/products.models.js";
import { cartModel } from "../src/models/carts.models.js";



const expect = chai.expect

const request = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL);

const userTest = await userModel.findById("657b6060688019a810eda02d")

const tokenTest = generateToken(userTest)



describe("Testing products model CRUD route /api/carts", function () {

    it("Obtener un cart mediante método GET", async () => {
        const cart = await request
            .get(`/api/carts/650d9d90c86a122568924819`)
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(cart.statusCode).to.equal(200)
    })

    it("Actualizar producto mediante método POST", async () => {
        const cart = await request
            .post('/api/carts/650d9d90c86a122568924819/products/65061db22d8ffc4d8b01e5e7')
            .send({
                quantity: 7
            })
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(cart.statusCode).to.equal(200)
    })
})

