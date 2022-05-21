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

export { createTour };
