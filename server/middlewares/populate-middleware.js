function populateUser(req, res, next) {
    const { id, email, first_name, last_name,role } = req.user;
  
    req.user = {
      id,
      email,
      first_name,
      last_name,
      role
    };
  
    next();
  }
  
  module.exports = {
    populateUser,
  };
  