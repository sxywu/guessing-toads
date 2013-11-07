define([
  "jquery",
  "underscore",
  "backbone",
  "app/collections/People.Collection"
], function(
  $,
  _,
  Backbone,
  PeopleCollection
) {
  return Backbone.View.extend({
    el: "body",
    initialize: function() {
      this.collection = new PeopleCollection();

      this.collection.on("guessed", _.bind(this.guessed, this));
    },
    render: function() {
      this.collection.fetch({reset: true});
    },
    events: {
      "click .guess": "guess",
      "click .feedback .btn": "feedback"
    },
    guess: function() {
      var weight = $(".weight").val(),
        height = $(".height").val();

      if (weight && height) {
        weight = parseInt(weight);
        height = parseInt(height);
        this.collection.add({weight: weight, height: height});
        $(".guess").addClass("disabled");
      }
    },
    guessed: function(gender, existing) {
      $(".gender").html(gender);
      $(".feedback").show();
    },
    feedback: function(e) {
      var feedback = $(e.target).attr("name"),
        model = this.collection.last();

      if (feedback === "wrong") {
        var gender = (model.get("gender") === "Female" ? "Male" : "Female");
        model.set("gender", gender);
      }
      console.log(model);
      model.save();

      $(".feedback").hide();
      $("input").val("");
      $(".guess").removeClass("disabled");
    }
  });
});