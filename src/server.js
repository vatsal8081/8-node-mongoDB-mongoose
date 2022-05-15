import dotenv from "dotenv";
import path from "path";

// 1
// now there are 2 ways we can connect to database in mongoDB one is atlas and other is local db now if we connect with atlis it's cloud database and we can use it from any syctem and if we connect to local db then it's just system base so in other system we have to create new or create db from backup of this.
import mongoose from "mongoose";

// 2
// bith way connecting is simple we just need mongoDB connecting string which we will pass to mongoose package and it will be connectd
// but it's database related confidencnal thing we should add it to env and then use.

// for lacal database the connection string will be mongodb://localhost:27017/<name_of_db>

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 3
// we can use the connect method from mongoDB to connect to database and it returns promiss so we can use try and catch hear but not now because we will learn error handling in future section.

// remember we are doing this after donenv config because before that we will not have env configs.

await mongoose.connect(process.env.MONGODB_CONNECTING_STRING);
console.log("connected to Database..");

const { app } = require("./app");

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app started at port: ${port}`));
