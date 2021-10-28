const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Invalid Email!!')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password can not contain "password"')
//             }
//         }
//     }
// })

// const me = new User({
//     name: 'User 3  ',
//     email: '  user3@gmail.com   ',
//     password: 'user1234'
// })

// me.save().then(() => {
//     console.log(me);
// }).catch((e) => {
//     console.log(e);
// })

// const task = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,

//     }
// })

// const t = new task({
//     description: 'Exploring  ',
// })

// t.save().then(() => {
//     console.log(t);
// }).catch((e) => {
//     console.log(e);
// })
