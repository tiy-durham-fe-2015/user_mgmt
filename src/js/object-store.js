// ObjectStore is a reusable store for objects that implement
// the 'euqal' function
function ObjectStore() {
  var objects = [],
    store = {
      exists: function (obj) {
        return objects.some(function (existingObj) {
          return obj.equal(existingObj);
        });
      },

      add: function (obj) {
        return !store.exists(obj) && objects.push(obj);
      },

      remove: function (obj) {
        objects = objects.filter(function (existingObj) {
          return !obj.equal(existingObj);
        });
      },

      query: function () {
        return objects;
      }
    };

  return store;
}
