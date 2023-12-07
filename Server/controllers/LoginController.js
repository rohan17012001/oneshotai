import User from '../models/UserModel.js';
import BookMode from '../models/BookMode.js';
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const Login = async (req, res) => {
    const { username, password } = req.body;
    await User.findOne({username}).then((user) => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!password) {
            return res.status(400).json({ error: "Password not provided" });
        }

        compare(password, user.passwordHash).then(async (result) => {
            if (result) {
                jwt.sign({username: user.username, email: user.email}, process.env.JWT_SECRET,{},(error,token)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({error: error})
                    }
                    else
                    {
                        // console.log(token);
                        // List of all books in the user's library
                        // console.log(user.books);
                        const books=user.books;
                        let BookList=[];
                        for(let i=0;i<books.length;i++){
                            BookMode.findOne({_id: books[i]}).then((book)=>{
                                BookList.push(book);
                            }).catch((err)=>{
                                console.log(err);
                                return res.status(500).json({error: err})
                            }
                            )
                        }
                        res.cookie('token',token).json({ok: true,token: token,username: user.username,email: user.email,books: BookList})
                    }
                });
            }
            else
            return res.status(401).json({ error: "Wrong password" });
        }
        ).catch((err) => {
            console.log('lol error detected')
            console.log(err);
            
            return res.status(500).json({ error: err });
        }
        );

    });
};

const Register = (req,res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    User.findOne({ $or: [{ username: username }, { email: email }] }).then((user) => {
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err })
    })

    hash(password, 10).then((passwordHash) => {
        User.create({
            username: username,
            email: email,
            passwordHash: passwordHash,
            books: []
        }).then((user) => {
            user.save()
            return res.status(201).json({ok: true})
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err })
    }
    )
    // res.json({ok: true})
}

export { Login, Register }