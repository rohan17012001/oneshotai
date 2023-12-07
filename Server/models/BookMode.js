import {model, Schema} from 'mongoose';

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: false},
    price: {type: Number, required: true},
    count: {type: Number, required: true},
});

export default model('Book', BookSchema);