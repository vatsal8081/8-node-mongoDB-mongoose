import dotenv from 'dotenv';
import path from 'path';

// 1
// now there are 2 ways we can connect to database in mongoDB one is atlas and other is local db now if we connect with atlis it's cloud database and we can use it from any syctem and if we connect to local db then it's just system base so in other system we have to create new or create db from backup of this.
import mongoose from 'mongoose';

// 2
// both way connecting is simple we just need mongoDB connecting string which we will pass to mongoose package and it will be connectd
// but it's database related confidential thing we should add it to env and then use.

// for local database the connection string will be mongodb://localhost:27017/<name_of_db>

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 3
// we can use the connect method from mongoDB to connect to database and it returns promise so we can use try and catch hear but not now because we will learn error handling in future section.
// in mongoose 5 we ave to pass some extra config options with mongoDB url to deal with some deprecation warnings but it's just part of configuring mongoose 5 so we should always add it in mongoose 5
// remember we are doing this after donenv config because before that we will not have env configs.

// we can use top level await insted of then hear if node version is latest but we are at node 12 so using then
mongoose
  .connect(process.env.MONGODB_CONNECTING_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to database..');
  });

const { app } = require('./app');

// 4
// when we want to work with mongoDB with mongoose and when we want to work with any collection of mongoDB we have
// to first create a schema in mongoose and then we have to create model out of it and a schema is nothing but just a kind of class you can say which
// represent the collection of the mongoDB in mongoose and we can define the type of data which we want to
// store in collection with the help of schema and also many many more things

// a model is just representation of schema with which we can perform the operations on collection.

// for now we will just create schema and model hear to better understand then we will follow the good file structure in future.

// we can use mongoose.Schema and pass object of schema in it we can also pass extra configuration which we learn in
// future
// const TourSchema = new mongoose.Schema({
//   // we can use object to define some options for field like this
//   name: { type: String, required: true, unique: true },
//   rating: { type: Number, default: 0 },
//   //   we can use direct datatype if we don't want to specify any kind of extra options
//   price: Number,
// });

// const Tour = mongoose.model('Tour', TourSchema);

// we can use mongoose.model and pass model name and schema to create model out if schema and the best practic hear
// is to always use singular and upper case names for both schema and model mongoDB will automatically create this name's
// purel and lower case name with - in it.

// 5
// now we will use this Tour model to create the simple tour to just show some of the many ways we use to intrect
// with the collection with model

// hear new Tour() is instance of the Tour model and because if that we will have some methods of mongoose to
// work with it like save to save specific new created tour

// const newTour = new Tour({
//   name: 'tour one 1',
//   price: 5000,
// });

// this save and many more mongoose methods will return promise to us so we can use await in it and hear again we
// will use then and catch insted if top level await

// newTour
//   .save()
//   .then((doc) => console.log(`doc is created : ${doc}`))
//   .catch((err) => console.log(`ERR : ${err}`));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app started at port: ${port}`));
