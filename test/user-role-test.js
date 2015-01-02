QUnit.test('roles are equal if their names are equal', function (assert) {
  assert.ok(makeRole().equal(makeRole()), 'Should be equal');
  assert.ok(!makeRole().equal(makeRole('234234')), 'Should not be equal');
});
