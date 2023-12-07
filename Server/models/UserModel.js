import {model,Schema} from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    books: {
        type: [{type: Schema.Types.ObjectId, ref: "Book"}],
        default: []
    }
});

export default model("User", UserSchema);
