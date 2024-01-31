import { userModel } from "../src/models/users.models.js";
import { productModel } from "../src/models/products.models.js";;
import mongoose from "mongoose";
import 'dotenv/config';
import chai from "chai"

const expect = chai.expect

let idUserTest ="";

await mongoose.connect(process.env.MONGO_URL);

describe("Testing users model CRUD route /api/users con CHAI", function () {

    it('Obtener todos los usuarios mediante GET', async () => {
        const user = await userModel.find()
        
        expect(Array.isArray(user)).to.be.ok
    })

    it("Obtener un usuario mediante metodo GET", async () => {
        const user = await userModel.findById('657b6060688019a810eda02d')
        
        expect(user).to.have.property("_id")
    })

    it("Crear un nuevo usuario mediante el metodo POST", async () => {
        const user = await userModel.create({
            nombre: "test",
            apellido: "test",
            email: "test@test.com",
            password: "1234",
            rol: "test",
            edad: 30
        })
        expect(user).to.have.property("_id")

        idUserTest = user._id.toString()
    })


    it("Actualizar un usuario mediante el metodo PUT", async () => {
        const user = await userModel.findByIdAndUpdate(idUserTest, {
            nombre: "testUpdate1",
            apellido: "testUpdate",
            email: "testUpdate@testUpdate.com",
            password: "1234",
            rol: "testUpdate",
        })
        expect(user).to.have.property("_id")
    })

    it("Eliminar un nuevo usuario mediante el metodo DELETE", async () => {
        const user = await userModel.findByIdAndDelete(idUserTest)
        expect(user).to.have.property("_id")
    })

   
})