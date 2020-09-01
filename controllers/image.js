const Clarifai = require("clarifai");
const secure = require("./secure");

const app = new Clarifai.App({
  apiKey: secure.apiKey,
});

const handleApiCall = (request, response) => {
  console.log("# CALLING handleApiCall #");
  console.log("request.body.input --->", request.body.input);
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
    .then((data) => {
      console.log("data ===>", data);
      return response.json(data);
    })
    .catch((err) => response.status(400).json(err));
};

const handleImage = (request, response, db) => {
  const { id } = request.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      response.json(entries[0]);
    })
    .catch((err) => response.status(400).json("unable to set entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
