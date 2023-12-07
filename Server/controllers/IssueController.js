import BookMode from '../models/BookMode.js';
import BookIssue from '../models/BookIssueModel.js';

const Issue = (req, res) => {
    const { bookId, userId, returnDate } = req.body;
    // BookMode.findById(bookId, (err, book) => {
    //     if (err) {
    //         res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    //     }
    //     else {
    //         if (book.count === 0) {
    //             res.status(500).json({ message: { msgBody: "Book is not available", msgError: true } });
    //         }
    //         else {

    //             const currDate = new Date();
    //             const issue = new BookIssue({ bookId, userId, currDate, returnDate });
    //             issue.save(err => {
    //                 if (err) {
    //                     res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    //                 }
    //                 else {
    //                     res.status(200).json({ message: { msgBody: "Book is issued", msgError: false } });
    //                 }
    //             })
    //         }
    //     }
    // })
    BookMode.findById(bookId).catch(err => {
        res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    }
    ).then(book => {
        if (book.count === 0) {
            res.status(500).json({ message: { msgBody: "Book is not available", msgError: true } });
        }
        else {

            const currDate = new Date();
            const issue = new BookIssue({ bookId, userId, currDate, returnDate });
            issue.save().catch(err => {
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                })
                .then(()=>{
                    res.status(200).json({ message: { msgBody: "Book is issued", msgError: false } });
                })
        }
    })
}

const Return = (req, res) => {
    const { bookId, userId } = req.body;
    BookIssue.findOneAndDelete({ bookId, userId }, err => {
        if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        }
        else {
            res.status(200).json({ message: { msgBody: "Book is returned", msgError: false } });
        }
    })
}





export { Issue, Return };