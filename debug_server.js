(function () {

  Meteor.Debug.clients = 0;
  Meteor.Debug.logs = new Meteor.Collection(null);

  Meteor.Debug.toArray = function(obj){
    var arr = [];
    for (var i in obj){
      arr.push(obj[i]);
    }
    return arr;
  };

  Meteor.Debug.broadcast = function(method){
    var args = this.toArray(arguments);
    args.shift();

    if (Meteor.Debug.clients > 0){
      Meteor.Debug.logs.update({id : "0"}, {$set : {method : method, data: args}});
    }
    else{
      console[method].apply(console, args);
    }
  };

  Meteor.Debug.log = function(){
    var args = this.toArray(arguments);
    args.unshift("log");
    this.broadcast.apply(this, args);
  };

  Meteor.Debug.warn = function(){
    var args = this.toArray(arguments);
    args.unshift("warn");
    this.broadcast.apply(this, args);
  };

  Meteor.Debug.info = function(){
    var args = this.toArray(arguments);
    args.unshift("info");
    this.broadcast.apply(this, args);
  };

  Meteor.Debug.logs.insert({id : "0"});

  Meteor.publish("remote-debug", function() {
    Meteor.Debug.clients++;

    this.onStop(function(){
      Meteor.Debug.clients--;
    });

    var self = this;
    Meteor.Debug.logs.find({id : "0"}).observeChanges({
      added : function(id, fields){
        self.added("remote-debug", id, fields);
      },
      changed : function(id, fields){
        self.changed("remote-debug", id, fields);
      }
    });
  });

})();
