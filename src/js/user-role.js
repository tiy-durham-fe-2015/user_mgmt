function UserRole(spec) {
  var role = {
    name: spec.name,

    equal: function (otherRole) {
      return role.name === otherRole.name;
    }
  };

  return role;
}
