/*
  Add roles to users via a textarea/textbox
*/

(function () {
  var users = UserStore();

  var userEditForm = document.querySelector('form.edit-user');

  function escapeHTML(str) {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };

    return str.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
  }

  function addUserFromForm(form) {
    var userSpec = {
      firstName: form.querySelector('.first-name').value,
      lastName: form.querySelector('.last-name').value,
      email: form.querySelector('.email').value
    };

    users.add(User(userSpec));
  }

  function redrawUsers() {
    function userToListItem(user) {
      return '<li class="users-list-item">' +
        '<span class="first-name">' + escapeHTML(user.firstName) + '</span>' +
        '<span class="last-name">' + escapeHTML(user.lastName) + '</span>' +
        '<span class="email">' + escapeHTML(user.email) + '</span>' +
        '</li>';
    }

    document.querySelector('.users-list').innerHTML =
      users.query().map(userToListItem).join('');
  }

  userEditForm.onsubmit = function (e) {
    addUserFromForm(userEditForm);
    redrawUsers();
    return false;
  };

})();
