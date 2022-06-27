const mongoose = require('mongoose');

const models = require('../models/schemaProd');

const moment = require('moment');

mongoose.connect('mongodb+srv://tobyceballos:coderhouse@cluster0.erpbj.mongodb.net/Cluster0?retryWrites=true&w=majority')



class Contenedor {
    constructor(){
        this.collection = models;
    }

    async saveMsj(autor, mensaje, fecha, hora){

        const newMsg = {
            author: autor,
            text: mensaje,
            fecha: fecha,
            hora: hora
        }

        const saves = await this.collection.insertMany(newMsg)
        return saves
    };

    async getMsg(){
        const gets = await this.collection.find()
        return gets
    }
};


const message = new Contenedor()
module.exports = message;
