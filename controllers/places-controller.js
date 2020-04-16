const uuid = require("uuid/v4");
const { validatorResult } = require("express-validator");

const HttpError = require("../models/http-error");

/* --------------------- DUMMY PLACES FOR USE (TEST RUN) -------------------- */
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "TAJ Mahal",
    description: "One of the 7 miricales",
    imageURL:
      "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    address: "52GR+3V Tajganj, Agra, Uttar Pradesh, India",
    location: {
      lat: 27.1751448,
      lng: 78.0421422,
    },
    creator: "u1",
  },
];

/* ----------------------------- Get Place by id ---------------------------- */

const getPlaceById = (req, res, next) => {
  const placeID = req.params.pid; //{pid:"p1"}

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeID;
  });
  if (!place) {
    throw new HttpError("Could not find the place for the propvided id", 404);
    //  return res
    //    .status(404)
    //    .json({ message: "Could not find the place for the propvided id" });
  }

  //console.log("GET REQUIEST IN PLACES");
  res.json({ place });
};

/* -------------------------- Get Places By User Id ------------------------- */

const getPlacesByUserId = (req, res, next) => {
  const userID = req.params.uid;

  const places = DUMMY_PLACES.filter((place) => {
    return place.creator === userID;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find the places for the propvided id", 404)
    );
    //  return res
    //    .status(404)
    //    .json({ message: "Could not find the place for the propvided id" });
  }

  res.json({ places });
};

/* ------------------------------ Create Place ------------------------------ */
const createPlace = (req, res, next) => {
  const error = validatorResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid input,please enter valid data");
  }

  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

  res.status(201).json({ place: createdPlace });
};

/* ------------------------------ Update Place ------------------------------ */
const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId); //get the index of the object we need

  updatedPlace.title = title; //            assign the values we want changed
  updatedPlace.description = description; // to the actual object contining the data

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

/* ------------------------------ Delete Place ------------------------------ */
/**
 * @param {request} req
 * @param {response} res
 * @param {nextStep} next
 */
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);
  res.status(200).json({ message: "Deleted Place" });
};

/* --------------------------------- EXPORT --------------------------------- */

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
