// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

// const id = new ObjectId()
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to databse');
    }

    const db = client.db(dbName);

    /* CREATE
    db.collection('users').insertOne({
        name: 'Pankaj ji',
        age: 21
    }, (error, result) => {
        if (error) {
            return console.log('unable to insert to databse');
        }
        console.log("insertion done");
    })

    db.collection('users').insertMany([{
        name: 'Pankaj ji',
        age: 21
    }, {
        name: 'Shivhare ji',
        age: 21
    }], (error, result) => {
        if (error) {
            return console.log('unable to insert to databse');
        }
        console.log("insertion done");
    })

    db.collection('tasks').insertMany([{
        task: 'Cooking',
        deadLine: 'till 7PM'
    }, {
        task: 'Studying',
        age: 'krte rho hmesha'
    }, {
        task: 'rehn de yrr',
    }], (error, result) => {
        if (error) {
            return console.log('unable to insert to databse');
        }
        console.log("insertion done");
    })
    */


    db.collection('users').findOne({ name: 'Pankaj ji' }, (error, user) => {
        if (error) {
            return console.log('unable to fetch data');
        }
        console.log(user);
    })

    db.collection('users').find({ age: 21 }).toArray((e, users) => {
        console.log(users);
    })
    db.collection('users').find({ age: 21 }).count((e, count) => {
        console.log(count);
    })

    /* DELETE
    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectId("614efde84901e2e08ecdb49b")
    }, {
        $set: {
            name: 'Pnkj jii'
        }
    })

    updatePromise.then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    })

    db.collection('users').updateOne({
        _id: new ObjectId("614efde84901e2e08ecdb49b")
    }, {
        $set: {
            name: 'Pnkj jii'
        }
    }).then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    })
    */

    /*
    db.collection('users').deleteMany({
        age: 21
    }).then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    })
    */
})
