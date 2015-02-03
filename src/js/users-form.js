// The UI component that handles inputing a user
function UsersForm(form, usersStore, usersUpdated) {

  // Handle adding a user
  form.onsubmit = function (e) {
    if (usersStore.add(getUserFromForm())) {
      clearInputs();
      focusFirstInput();
      usersUpdated();
    } else {
      alert('There is already a user with that email!');
    }

    return false;
  };

  // Extract the form inputs into a user object
  function getUserFromForm() {
    var userSpec = {
      firstName: form.querySelector('.first-name').value,
      lastName: form.querySelector('.last-name').value,
      email: form.querySelector('.email').value
    };

    return User(userSpec);
  }

  // Clear the form inputs
  function clearInputs() {
    htmlUtils.eachNode(form.querySelectorAll('input, textarea'), function (node) {
      node.value = '';
    });
  }

  // Focus the first input
  function focusFirstInput() {
    form.querySelector('input').focus();
  }

}
