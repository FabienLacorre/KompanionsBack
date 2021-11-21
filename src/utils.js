const errorHandler = (res, err) => {
  console.log(err);
  res.send(500);
};

module.exports = {
  errorHandler,
};
