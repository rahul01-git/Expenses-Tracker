function populateUser(req, res, next) {
    const { id, email, first_name, last_name,role,income,expenses } = req.user;
    req.user = {
      id,
      email,
      first_name,
      last_name,
      role,
      income,
      expenses
    };
  
    next();
  }
  

  module.exports = {
    populateUser
  };
  