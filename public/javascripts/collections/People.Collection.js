define([
  "jquery",
  "underscore",
  "backbone",
  "app/models/Person.Model"
], function(
  $,
  _,
  Backbone,
  PersonModel
) {
  return Backbone.Collection.extend({
    url: "/person",
    model: PersonModel,
    initialize: function() {
      this.on("add", _.bind(this.guess, this));
    },
    guess: function(model) {
      var weight = model.get("weight"),
        height = model.get("height"),
        existing = this.chain().initial()
          .filter(function(m) {
            return m.get("weight") === weight
              && m.get("height") === height;
          }).countBy(function(m) {
            return m.get("gender");
          }).value(),
        gender;

      if (_.isEmpty(existing)) {
        gender = (height > 68 ? "Male" : "Female");
      } else {
        gender = (existing.F > existing.M ? "Female" : "Male");
      }
      this.trigger("guessed", gender, existing);
      model.set("gender", gender, {silent:true});
    }
  });
});