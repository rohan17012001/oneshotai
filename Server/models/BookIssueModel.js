import {model, Schema} from 'mongoose';

const BookIssueSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: Date.now
    },
});

export default model('BookIssue', BookIssueSchema);