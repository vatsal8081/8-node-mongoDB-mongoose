import mongoose from 'mongoose';

// 1
// now lets start using a basic MVC structure in our app so as per MVC we already created the routes folder for handeling diffrent routers. we also created the controller folder for handling req and response and now we will create a model molder where just like we create seprate router instance, sperate controller for one entity which is tour hear so like this we will also create seprate fine to create tour schima and make model out of it.

//  so we will comment out the tour schema and model created in server js for reference and we will pant it hear.

const TourSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: Number, default: 0 },
  price: Number,
});

const Tour = mongoose.model('Tour', TourSchema);

export default Tour;
