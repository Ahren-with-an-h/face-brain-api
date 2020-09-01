const handleProfileGet = (request, response, db) => {
  const { id } = request.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        response.json(user[0]);
      } else {
        response.status(400).json("error getting user");
      }
    })
    .catch((err) => res.status(400).json("Not found"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
