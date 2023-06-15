function populateUser(req, res, next) {
    const { id, email, first_name, last_name } = req.user;
  
    req.user = {
      id,
      email,
      first_name,
      last_name,
    };
  
    next();
  }
  
  module.exports = {
    populateUser,
  };
  