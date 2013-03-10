(function () {

  Meteor.Debug.logs = new Meteor.Collection("remote-debug");
  Meteor.subscribe("remote-debug");
  Meteor.Debug.logs.find({id:"0"}).observe({
    changed : function(log){
      Meteor.Debug._display(log);
    }
  });

  Meteor.Debug._display = function(logData){
    var method = logData.method;
    var data = logData.data;
    if (!data)
      return;

    if (window.console && (window.console.firebug || window.console.exception)){
      data.unshift("%c", "color:black; background-color:#ADD6FF");
      if (console[method])
        console[method].apply(console, data);
      else
        console.log.apply(console, data);
    } else {
      data.unshift("SERVER ");
      if (console[method])
        console[method].apply(console, data);
      else if (window.console)
        window.console[method].apply(window.console, data);
    }
  };


})();