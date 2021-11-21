const errorHandler = (res, err, customMessage) => {
  console.log("----------------");
  console.log("----- ERR ------");
  console.log("----------------");
  console.log(err);
  console.log("----------------");
  console.log("----------------");
  console.log("----------------");
  let message = "Erreur interne";
  if (customMessage) {
    message = customMessage;
  }
  res.send(500, message);
};

module.exports = {
  errorHandler,
};
