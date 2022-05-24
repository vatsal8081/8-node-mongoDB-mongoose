import Tour from '../models/tourModel';

const createTour = async (req, res) => {
  // now hear we are using the async and await

  //   we should use try catch to avoid the 500 or infinite request stuch case in node when ever we use promis or anything which can lead to this problem and send meaning full responses to clients if opration fails
  // we will learn more in depth of error handling when we will learn it in future but for now it's ok this way
  try {
    // tour.create is another way to creste tour and create is method provided by mongoose which we can use it also return promis
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  //   you can see when we don't use the try catch blocks and directly use promiss our request will stay in server so client will get notthing in response back the request will stay loading infinite so that's the worst case which we should not create in our app so for that we should always use the proper error handling in our app as a best practic.

  //   when we pass any extra data in request body which we don't define in schima then mongoose will ignore them and only use it's needed keys from object for creation.

  //   the rating and the price is number still if you pass string then mongoose will convert it for you in number and then store.
};

const getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find();
    res.json({
      status: 'success',
      results: allTours.length,
      data: allTours,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fali',
      message: err,
    });
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err,
    });
  }
};

const updateTourIdByPatch = async (req, res) => {
  try {
    // this findByIdAndUpdate function requires id of document, values to update, and it also accept optional arguments and new is one of them when it's true the method return newley updated document which we can return to clients.
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      status: 'success',
      data: updatedTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.josn({
      status: 'fail',
      message: err,
    });
  }
};

export {
  createTour,
  getAllTours,
  getTourById,
  updateTourIdByPatch,
  deleteTour,
};
