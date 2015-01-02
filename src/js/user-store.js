function UserStore() {
  // Get a new object store
  var users = ObjectStore();

  /**
   * queryByRole function - returns all users that are in a given role
   *
   * @param  {string} roleName - the role to search
   * @return {Array} - the list of users in the specified role
   */
  users.queryByRole = function (roleName) {
    return users.query().filter(function (user) {
      return user.isInRole(roleName);
    });
  };

  // haveSameDomain tests to see if every user has the same
  // email domain
  users.haveSameDomain = function () {
    var allUsers = users.query(),
      firstUserEmailDomain = allUsers.length && emailDomain(allUsers[0].email);

    return allUsers.length && allUsers.every(function (user) {
      return emailDomain(user.email) === firstUserEmailDomain;
    });
  };

  // emailDomain returns the domain portion of an email
  function emailDomain(email) {
    return email.split('@')[1];
  }

  return users;
}
