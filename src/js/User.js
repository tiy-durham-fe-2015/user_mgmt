/**
 * User - constructs a new user object
 *
 * Users have the following properties:
 * - firstName
 * - lastName
 * - email
 *
 * Users have the following methods:
 *
 * - addRole(roleName) - adds the specified role to the user
 *
 * - removeRole(roleName) - removes the specified role from the user
 *
 * - isInRole(roleName) - returns true if the user is in the specified role
 *
 * @param  {object} spec - an object with a firstName, lastName, and email
 *
 * @return {user}
 */
function User(spec) {
  // userRoles is a hash-table of roles
  var userRoles = { },

    // user is the new user object
    user = {
      firstName: spec.firstName,

      lastName: spec.lastName,

      email: spec.email,

      addRole: function (roleName) {
        userRoles[roleName] = true;
      },

      removeRole: function (roleName) {
        delete userRoles[roleName];
      },

      isInRole: function (roleName) {
        return !!userRoles[roleName];
      },

      equal: function (otherUser) {
        return otherUser.email === user.email;
      }
    };

  return user;
}
