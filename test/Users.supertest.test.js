import chai from "chai";
import mongoose from "mongoose";
import 'dotenv/config';
import supertest from "supertest";
import { userModel } from "../src/models/users.models.js";
import { generateToken } from "../src/utils/jwt.js";
import { productModel } from "../src/models/products.models.js";

const expect = chai.expect

const request = supertest('http://localhost:4000')

await mongoose.connect(process.env.MONGO_URL);

//Generar token de prueba para el login

const userTest = await userModel.findById("657b6060688019a810eda02d")

const tokenTest = generateToken(userTest)

let idUserTest ="";





describe("Testing users model CRUD route /api/users con supertest", function () {

    it("Obtener todos los usuarios mediante GET", async () => {
        const users = await request
            .get('/api/users')
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(users.statusCode).to.equal(200)
    })

    it("Obtener un usuario mediante el metodo GET", async () => {
        const user = await request
            .get(`/api/users/${userTest._id}`)
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(user.statusCode).to.equal(200)
    })

    it("Crear un nuevo usuario mediante el metodo POST", async () => {
        const user = await request
            .post('/api/sessions/register')
            .send({
                nombre: "test",
                apellido: "test",
                email: "testRegister@testRegister.com",
                password: "1234",
                rol: "Admin",
                edad: 30
            })
        expect(user.statusCode).to.equal(200)

        const userNew = await userModel.findOne({ email: "testRegister@testRegister.com" })
        idUserTest = userNew._id.toString()
    
    })

    it("Actualizar un usuario mediante el método PUT", async () => {
        const user = await request
            .put(`/api/users/${idUserTest}`)
            .set('Authorization', `Bearer ${tokenTest}`)
            .send({
                nombre: "test",
                apellido: "test",
                email: "testRegister@testRegister.com",
                password: "1234",
                rol: "Admin",
                edad: 30
            })
        expect(user.statusCode).to.equal(200)
    })

    it("Eliminar un usuario mediante método DELETE", async () => {
        const user = await request
            .delete(`/api/users/${idUserTest}`)
            .set('Authorization', `Bearer ${tokenTest}`)
        expect(user.statusCode).to.equal(200)
    })

    
    
})