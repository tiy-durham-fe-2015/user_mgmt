/**
 * User - constructs a new user object
 *
 * @param  {object} spec - an object with a firstName, lastName, email, and optinally roles
 *
 * @return {user}
 */
function User(spec) {

  validate();

  return construct();

  // Validate the spec
  function validate() {
    requireSpec();
    requireString('firstName');
    requireString('lastName');
    requireString('email');
  }

  // Test to see if the spec has a string property with the given name
  function requireString(propertyName) {
    if (!spec[propertyName] || !spec[propertyName].trim()) {
      throw { err: 'User: ' + propertyName + ' is required.' };
    }
  }

  // Test to see if spec is not undefined
  function requireSpec() {
    if (!spec) {
      throw { err: 'User: spec is a required argument.' };
    }
  }

  // Build up an object with role properties
  function makeRolesObject() {
    return (spec.roles || []).reduce(function (hash, role) {
      hash[role] = true;
      return hash;
    }, { });
  }

  // Construct a new user object
  function construct() {
    // userRoles is the set of roles
    var userRoles = makeRolesObject();

    // user is the new user object
    var user = {
      firstName: spec.firstName,

      lastName: spec.lastName,

      email: spec.email,

      fullName: function () {
        return user.firstName + ' ' + user.lastName;
      },

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

}
