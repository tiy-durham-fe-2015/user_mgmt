/*
  Unit tests for the User class.
*/
function makeUser() {
  return User({
    firstName: 'Chris',
    lastName: 'Davies',
    email: 'chris.davies@example.com'
  });
}

QUnit.test('add role puts user in role', function(assert) {
  var user = makeUser(),
    role = 'admin';

  assert.ok(!user.isInRole(role));
  user.addRole(role);
  assert.ok(user.isInRole(role));
});

QUnit.test('duplicate adds behave like a single add', function (assert) {
  var user = makeUser(),
    role = 'student';

  user.addRole(role);
  user.addRole(role);

  assert.ok(user.isInRole(role));

  user.removeRole(role);
  assert.ok(!user.isInRole(role));
});

QUnit.test('multiple roles are supported', function (assert) {
  var user = makeUser(),
    role1 = 'admin',
    role2 = 'student';

  user.addRole(role1);
  user.addRole(role2);

  assert.ok(user.isInRole(role1));
  assert.ok(user.isInRole(role2));

  user.removeRole(role1);

  assert.ok(!user.isInRole(role1));
  assert.ok(user.isInRole(role2));
});
