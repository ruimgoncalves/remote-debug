(function () {

  Meteor.Debug.logs = new Meteor.Collection("debug");

  Meteor.subscribe("debug", function(){
    Meteor.Debug.logs.find().observe({
      added : function(log, idx){
        Meteor.Debug._display(log);
      },
      changed : function(log, idx){
        Meteor.Debug._display(log);
      }
    });
  });

  Meteor.Debug._display = function(logData){
    var logCount = logData.log;
    var logArgs = logData.data;

    if (window.console && (window.console.firebug || window.console.exception)){
      logArgs.unshift("%c", "color:black; background-color:#ADD6FF");
      console.log.apply(console, logArgs);
    } else {
      logArgs.unshift("SERVER ");
      var consl;
      if (console.log)
        consl = console.log;
      else if (window.console)
        consl = window.console;

      if (consl)
          consl.apply(console, logArgs);
    }
  };


})();