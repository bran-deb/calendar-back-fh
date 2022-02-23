const { model, Schema } = require('mongoose')



const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {                                 //usuario que creo el registro
        type: Schema.Types.ObjectId,        //referencia
        ref: 'Usuario',
        required: true
    }
})


//sobreEscribir toJson
EventoSchema.method('toJSON', function () {
    //tiene las propiedades del json y destructura _v, _id y una copia del object
    const { __v, _id, ...object } = this.toObject()
    object.id = _id     //cambia la propiedad de _id a id
    return object       //retorna el object sin _v y con id
})


module.exports = model('Evento', EventoSchema)