/*
  Add roles to users via a textarea/textbox
*/
(function () {
  // Create the user store to be used by the UI
  var users = UserStore();

  // Initialize the users form component
  var usersForm = UsersForm(document.querySelector('form.edit-user'), users, redrawUsers);

  // Initialize the users list component
  var usersList = UsersList(document.querySelector('.users-list-container'), users, redrawUsers);

  // Redraw the users list
  function redrawUsers() {
    usersList.redraw();
    updateTitle();
  }

  // Updates the page title
  function updateTitle() {
    document.title = 'Users [' + users.query().length + ']';
  }

  updateTitle();

})();
