// The UI component that displays a list of users
function UsersList(rootElement, usersStore, usersUpdated) {
  var sortOrder = 1,
    usersSearchTerm = '';

  attachEvents();

  return construct();

  // Construct a new instance of the UsersList component
  function construct() {
    return {
      redraw: redraw
    };
  }

  // Attach events to the rootElement and children
  function attachEvents() {
    attachDeleteUserEvent();
    attachSortUsersEvent();
    attachFilterUsersEvent();
  }

  // Handle filtering the user list
  function attachFilterUsersEvent() {
    rootElement.querySelector('.users-list-filter').oninput = function (e) {
      usersSearchTerm = e.target.value;
      usersUpdated();
    };
  }

  // Handle sorting the user list
  function attachSortUsersEvent() {
    rootElement.querySelector('.users-list-sort-order').onchange = function (e) {
      sortOrder = Number(e.target.value);
      usersUpdated();
    };
  }

  // Handle deleting a user
  function attachDeleteUserEvent() {
    rootElement.onclick = function (e) {
      if (e.target.classList.contains('remove-user')) {
        removeUserByEmail(e.target.dataset.email);
        usersUpdated();

        return false;
      }
    };
  }

  // redraw the user list
  function redraw() {
    var escapeHTML = htmlUtils.escapeHTML;

    function userToListItem(user) {
      return '<li class="users-list-item">' +
        '<span class="first-name">' + escapeHTML(user.firstName) + '</span>' +
        '<span class="last-name">' + escapeHTML(user.lastName) + '</span>' +
        '<span class="email">' + escapeHTML(user.email) + '</span>' +
        '<a class="remove-user" href="#" data-email="' + escapeHTML(user.email) + '">X</a>' +
        '</li>';
    }

    function compareUserNames(user1, user2) {
      return (user1.fullName().toLowerCase() > user2.fullName().toLowerCase())
        ? sortOrder : -sortOrder;
    }

    function contains(str, subString) {
      return (str || '').toLowerCase().indexOf(subString.toLowerCase()) >= 0;
    }

    function usersFilter(user) {
      var searchString = [
        user.firstName,
        user.lastName,
        user.email
      ].join(' ');

      return contains(searchString, usersSearchTerm);
    }

    rootElement.querySelector('.users-list').innerHTML =
      usersStore.query()
      .filter(usersFilter)
      .sort(compareUserNames)
      .map(userToListItem)
      .join('');
  }

  // Remove user by email
  function removeUserByEmail(email) {
    usersStore.remove(usersStore.findByEmail(email));
  }
}
