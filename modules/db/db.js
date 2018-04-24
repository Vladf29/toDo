'use strict'

const {
    MongoClient,
    ObjectID
} = require('mongodb');

const urldb = 'mongodb://localhost:27017';
const namedb = 'toDoList';
const collectiondb = 'list';

class DB {
    static add(task) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(urldb, (err, client) => {
                if (err) reject(err);

                const db = client.db(namedb);
                const collection = db.collection(collectiondb);
                collection.insertOne(task).then((res) => resolve(res), (err) => reject(err));
                client.close();
            });
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(urldb, (err, client) => {
                if (err) reject(err);
                const db = client.db(namedb);
                const collection = db.collection(collectiondb);
                collection.find({}).toArray().then((res) => resolve(res), (err) => reject(err));
                client.close();
            });
        });
    }
    static delete(id) {
        const id = new ObjectID(id);
        return new Promise((resolve, reject) => {
            MongoClient.connect(urldb, (err, client) => {
                if (err) reject(err);
                const db = client.db(namedb);
                const collection = db.collection(collectiondb);
                collection.findOneAndDelete({
                    _id: id
                }).then((res) => resolve(res), (err) => reject(err));
            });
        });
    }
    static done(id) {

    }
}

module.exports = DB;