module.exports = handleError = (error, res) => {
    if (error.name === "ValidationError") {
      let errors = {};
  
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
  
      return res.status(400).send(errors);
    }
    return res.status(500).send("Something went wrong");
  };