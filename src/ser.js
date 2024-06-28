const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'systemdsi';
const collectionName = 'users';

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.find().toArray(function(err, items) {
      if (err) {
        console.log(err);
      } else {
        console.log(items);
      }
    });
  }
});
