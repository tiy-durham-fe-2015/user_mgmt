/*
  Unit tests for the User class.
*/
QUnit.test('users with the same email should be equal', function (assert) {
  var user1 = makeUser(),
    user2 = makeUser('Joe', 'Shmo', 'js@example.com');

  assert.ok(!user1.equal(user2));
  assert.ok(user1.equal(makeUser()));
});

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

QUnit.test('fullName returns the users full name', function (assert) {
  var user = makeUser('Chris', 'Davies');
  assert.equal(user.fullName(), 'Chris Davies');
});
