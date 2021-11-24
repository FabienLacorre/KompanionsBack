const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const errorHandler = (res, err, customMessage, code) => {
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
  res.send(code != null ? code : 500, message);
};

module.exports = {
  errorHandler,
  hashPassword,
};
