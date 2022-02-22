const { model, Schema } = require('mongoose')



const EventoSchema = Schema({
    title: {
        type: String,
        require: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: {                                 //usuario que creo el registro
        type: Schema.Types.ObjectId,        //referencia
        ref: 'Usuario'
    }
})



module.exports = model('Evento', EventoSchema)