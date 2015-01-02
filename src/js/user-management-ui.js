/*
  Add roles to users via a textarea/textbox
*/

(function () {
  var users = UserStore(),
    userEditForm = document.querySelector('form.edit-user'),
    usersList = document.querySelector('.users-list');

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

  function compareEmails(user1, user2) {
    return (user1.email > user2.email) ? 1 : -1;
  }

  function redrawUsers() {
    function userToListItem(user) {
      return '<li class="users-list-item">' +
        '<span class="first-name">' + escapeHTML(user.firstName) + '</span>' +
        '<span class="last-name">' + escapeHTML(user.lastName) + '</span>' +
        '<span class="email">' + escapeHTML(user.email) + '</span>' +
        '<a class="remove-user" href="#" data-email="' + escapeHTML(user.email) + '">X</a>' +
        '</li>';
    }

    document.querySelector('.users-list').innerHTML =
      users.query().sort(compareEmails).map(userToListItem).join('');
  }

  function removeUser(email) {
    users.remove(User({ email: email }));
  }

  userEditForm.onsubmit = function (e) {
    addUserFromForm(userEditForm);
    redrawUsers();
    clearInputs(userEditForm);

    return false;
  };

  usersList.onclick = function (e) {
    if (e.target.classList.contains('remove-user')) {
      removeUser(e.target.dataset.email);
      redrawUsers();
      
      return false;
    }
  };

})();
