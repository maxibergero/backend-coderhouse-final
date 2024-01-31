import { userModel } from "../src/models/users.models.js";
import { productModel } from "../src/models/products.models.js";;
import Assert from "assert";
import mongoose from "mongoose";
import 'dotenv/config';


//Constante para primero agregar usuario y luuego eliminarlo

let idUserTest = "";


const assert = Assert.strict;

//conectar a mongoose con cadena que esta en el archivo .env
await mongoose.connect(process.env.MONGO_URL);


describe('Testing Users model CRUD route /api/users', function () {

    it('Obtener todos los usuarios mediante GET', async () => {
        const user = await userModel.find()
        assert.strictEqual(Array.isArray(user), true)
    })

    it('Obtener un usuario mediante método GET', async () => {
        const user = await userModel.findById('657b6060688019a810eda02d')
        assert.ok(user._id)

    })

    it("Crear un nuevo usuario mediante el metodo POST", async () => {
        const user = await userModel.create({
            nombre: "test",
            apellido: "test",
            email: "test@test.com",
            password: "1234",
            rol: "Admin",
            edad: 30
        })

        assert.ok(user._id)
        idUserTest = user._id.toString()
        

    })

    it("Actualizar un usuario mediante el método PUT", async() => {
        const user = await userModel.findByIdAndUpdate(idUserTest, {
            nombre: "testUpdate1",
            apellido: "testUpdate",
            email: "testUpdate@testUpdate.com",
            password: "1234",
            rol: "Admin",
            edad: 30
        })
        assert.ok(user._id)
    })


    it("Eliminar un usuario mediante el metodo DELETE", async () => {
        const user = await userModel.findByIdAndDelete(idUserTest)
        assert.ok(user._id)
        
    })




    


})