define([
  "jquery",
  "underscore",
  "backbone"
], function(
  $,
  _,
  Backbone
) {
  return Backbone.Model.extend({
    url: "/person",
    toJSON: function() {
      var json = {};
      json.height = this.get("height");
      json.weight = this.get("weight");
      json.gender = (this.get("gender") === "Female" ? "F": "M");

      return {person: json};
    }
  });
});