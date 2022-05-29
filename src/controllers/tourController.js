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

const getAllToursWithFilter = async (req, res) => {
  try {
    // now there are many ways we can provide filtering, serach, sort, pagination and many other feactures to our api hear we will learn basic way with which we can provide the filtering to our api results and in future we will extend it to searching, sorting, pagination etc.

    // just keep in mand we can pass the query filters in api by passing it to query string in api endpoint and we can easily get those as json object in req.query object.

    // const allTours = await Tour.find().where('price').equals(3000);

    // this is the mongoose way where we can chain the query object and use many avalable methods on query object like this.

    // we can also pass the query filter in find as object as we do in mongodb query and it will also work same way in mongoose find method and it's more easy and dynamic to use so we will pass query object to give our api ablity to finter base on diffrent fields and condations.
    // hear if we pass ?price=300&name=test two we will get this as {price: '3000', name: 'test two'} in req.query object so we can directly pass it to provide dynamic querys.
    const allTours = await Tour.find(req.query);
    res.json({
      status: 'success',
      results: allTours.length,
      data: allTours,
    });

    // also keep in mind that above way we will only able to filter the fields only if we want to do $gt $lt and this kind of filters which we do in the find mongodb query then for that we have to create and pass whole query object in query param and we can pass it to the find for more dynamic query filters.

    // we can create query param kile this ?query={price: $gt: {3000} } and we will get {query: {price: $gt: {3000} } } in request.query so we can pass req.query.query to the find for support almost all kind of find conditions which we do in find methos.

    // both 2 above are the ways whit which we do filtering most of the time in express and mongoDB base apps. because it's as eays as creating query object and passing it to find method.

    // one more thing when we do Tour.find() or any other thing related to query on model then it will be a query object initially so that's why we will have where, equals and etc more methods on it and when we put await in front that mins we are executing the query and we will get document out of it.
    // many times we want to built whole query abse on some sondations for thate we can store those query in any variable without await so it will not execute it stays as query object and can add more query methods on it like this
    // let query = Tour.find()
    // query = query.where('price').equals(3000)
    // const data = await query
  } catch (err) {
    res.status(400).json({
      status: 'fali',
      message: err,
    });
  }
};

const getAllToursWithSort = async (req, res) => {
  try {
    // we can provide serch, sort, filter in all the ways which we discuss above we can use seprate query field for each options we can get object with filter and sort, we can get object for filter and seprate field for sort
    // this it totaly depand on our senario and requarments. but now let's make a api whic can suppoet multiple sorting.

    const sortBy = req.query?.sort
      ? req.query?.sort.split(',').join(' ')
      : '-price';

    // in sorting we can pass sort filed as string in sort function for assending sort and -<field name> for desanding sort and we can pass multiple sort fields as well by giving space between fields
    // in query string we can't give space between the tow fields so we will put , in between and hear we will replace it with space.
    // with this we can pass price, -price, price,name name, -price anything and our api will support this.
    const allTours = await Tour.find().sort(sortBy);
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

export {
  createTour,
  getAllTours,
  getTourById,
  updateTourIdByPatch,
  deleteTour,
  getAllToursWithFilter,
  getAllToursWithSort,
};
