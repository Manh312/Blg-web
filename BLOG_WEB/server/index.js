const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const UserModel = require('./models/UserModel');
const PostModel = require('./models/PostModel');


const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(cookieParser());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/blog');

const veryfiUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json('The token is missing');
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.clearCookie('token');
          return res.status(401).json('Token expired');
        }
        return res.status(403).json('Invalid token');
      } else {
        req.email = decoded.email;
        req.username = decoded.username;
        next();
      }
    })
  }
}

app.get('/', veryfiUser, (req, res) => {
  return res.json({ email: req.email, username: req.username });
})

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      UserModel.create({ username, email, password: hash })
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err));
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, username: user.username }, 'jwt-secret-key', { expiresIn: '1h' })
            res.cookie('token', token, {
              httpOnly: true,
              // secure: true,
              sameSite: 'strict'
            });
            return res.json('Success');
          } else {
            return res.json('Password is incorrect');
          }
        })
      } else {
        res.json('User not exist');
      }
    })
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
})

app.post('/createPost', veryfiUser, upload.single('file'), (req, res) => {
  PostModel.create({
    title: req.body.title,
    description: req.body.description,
    file: req.file.filename
  })
    .then(result => res.json('Success'))
    .catch(err => res.json(err))
});


app.get('/getPosts', (req, res) => {
  PostModel.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
});

app.get('/getPostById/:id', (req, res) => {
  const id = req.params.id;
  PostModel.findById({ _id: id })
    .then(post => res.json(post))
    .catch(err => console.log(err))
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json('Success');
});



app.listen(3000, () => {
  console.log('Server is running');
});