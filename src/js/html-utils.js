var htmlUtils = {

  escapeHTML: function (str) {
    var tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    };

    return str.replace(/[&<>]/g, function(tag) {
      return tagsToReplace[tag] || tag;
    });
  },

  eachNode: function (nodes, callback) {
    for (var i = 0; i < nodes.length; ++i) {
      callback(nodes[i]);
    }
  }
};
