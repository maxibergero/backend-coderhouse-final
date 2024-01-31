import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    purchase_datatime: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    purcharser: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    }
}
)



ticketSchema.pre(['findOne', 'find', 'findById'], function () {
    this.populate('cart')
  
})

export const ticketModel = model('ticket', ticketSchema)