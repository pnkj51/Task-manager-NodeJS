const express = require('express')
const router = new express.Router()
const Task = require('../models/task');
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body);

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

// GET /tasks?completed=false/true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt_asc/createdAt:desc
router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    // if (req.query.limit) {
    //     l = parseInt(req.query.limit)
    // }

    // s = req.query.skip ? parseInt(req.query.skip) : 0

    try {
        // var task = await Task.find({ owner: req.user._id }).limit(l).skip(s).sort()
        // if (req.query.completed) {
        //     task = await Task.find({ owner: req.user._id, completed: isTrue })
        // }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit ? req.query.limit : 0),
                skip: parseInt(req.query.skip ? req.query.skip : 0),
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e);
    }

    // Tasks.find({}).then((t) => {
    //     res.send(t)
    // }).catch((e) => {
    //     res.status(500).send(e);
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id;

    try {

        //const t = await Task.findById(_id);

        const t = await Task.findOne({ _id, owner: req.user._id })
        if (!t) return res.status(404).send();

        res.send(t);
    } catch (e) {
        res.status(500).send(e);
    }

    // Tasks.findById(_id).then((t) => {
    //     if (!t) return res.status(404).send();

    //     res.status(201).send(t);
    // }).catch((e) => {
    //     res.status(500).send(e);
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) return res.status(404).send({ error: 'Invalid Updates!!' })

    try {
        //const t = await Tasks.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        // const t = await Task.findById(req.params.id)

        const t = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!t) return res.status(404).send()

        updates.forEach((u) => {
            t[u] = req.body[u]
        })

        t.save();

        res.send(t)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const t = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        //const t = await Task.findByIdAndDelete(req.params.id)

        if (!t) return res.status(404).send()
        res.send(t)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router