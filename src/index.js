const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {

//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('upload a pdf only'))
//         }

//         cb(undefined, true)

//         // cb(new Error('File should be pdf'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(404).send({ error: error.message })
// })

// app.use((req,res,next)=>{
//         res.status(503).send('Site is under maintainance')
// })

app.use(express.json())

// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send("ksnj+fownf")
// })
// app.use(router)

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is running : ' + port);
})



// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('616ebc6ce2517792e807bbe6')
//     // await task.populate('owner').exec()
//     // console.log(task.owner);

//     // const user = await User.findById('616ebc4de2517792e807bbe0')
//     // console.log("1");
//     // await user.populate('Tasks').execPopulate()
//     // console.log(user.tasks);
// }

// main()

/**
 * without middleware : new request => run route handler
 * with middleware : new request => do something => run route handler
 */

// const jwt = require('jsonwebtoken')

// const myFunc = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse',{expiresIn:'2 days'})
//     console.log(token);

//     const d = jwt.verify(token, 'thisismynewcourse')
//     console.log(d);
// }

// myFunc()