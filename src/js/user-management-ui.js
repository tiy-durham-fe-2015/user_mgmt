/*
  Add roles to users via a textarea/textbox
*/
(function () {
  var users = UserStore(),
    userEditForm = document.querySelector('form.edit-user'),
    usersList = document.querySelector('.users-list'),
    sortOrder = 1;

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

  function eachNode(nodes, callback) {
    for (var i = 0; i < nodes.length; ++i) {
      callback(nodes[i]);
    }
  }

  function clearInputs(form) {
    eachNode(form.querySelectorAll('input, textarea'), function (node) {
      node.value = '';
    });
  }

  // Redraw the users list
  function redrawUsers() {
    function userToListItem(user) {
      return '<li class="users-list-item">' +
        '<span class="first-name">' + escapeHTML(user.firstName) + '</span>' +
        '<span class="last-name">' + escapeHTML(user.lastName) + '</span>' +
        '<span class="email">' + escapeHTML(user.email) + '</span>' +
        '<a class="remove-user" href="#" data-email="' + escapeHTML(user.email) + '">X</a>' +
        '</li>';
    }

    function compareUserEmails(user1, user2) {
      return (user1.email > user2.email) ? sortOrder : -sortOrder;
    }

    document.querySelector('.users-list').innerHTML =
      users.query().sort(compareUserEmails).map(userToListItem).join('');
  }

  // Remove user by email
  function removeUserByEmail(email) {
    users.remove(User({ email: email }));
  }

  // Events /////////////////////////////////////////

  // Handle adding a user
  userEditForm.onsubmit = function (e) {
    addUserFromForm(userEditForm);
    redrawUsers();
    clearInputs(userEditForm);

    return false;
  };

  // Handle deleting a user
  usersList.onclick = function (e) {
    if (e.target.classList.contains('remove-user')) {
      removeUserByEmail(e.target.dataset.email);
      redrawUsers();

      return false;
    }
  };

  // Handle sorting the user list
  document.querySelector('.users-list-sort-order').onchange = function (e) {
    sortOrder = Number(e.target.value);
    redrawUsers();
  };

})();
