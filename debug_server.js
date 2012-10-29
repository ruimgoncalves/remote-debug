(function () {

  Meteor.Debug = function(){
    var self = this;
    
    self.pub = null;
    self.logCount = 0;

    Meteor.publish("debug", function() {
      self.pub = this;

      this.onStop(function(){
        self.pub = null;
      });

      this.complete();
    });
  };

  Meteor.Debug.prototype.toArray = function(obj){
    var arr = [];
    for (var i in obj){
      arr.push(obj[i]);
    }
    return arr;
  };

  Meteor.Debug.prototype.send = function(){
    var args = this.toArray(arguments);
    if (this.pub){
      //this.pub.session.socket.send(_.extend({msg: 'result', id: -1}, message));
      this.pub.set("debug", "0", {data : args, log : this.logCount++});
      this.pub.flush();
    }
    else{
      Meteor._debug.apply(Meteor._debug, args);
    }
  };

  Meteor.Debug.prototype.log = function(){
    var args = this.toArray(arguments);
    this.send.apply(this, args);
  };


  // Singleton
  Meteor.Debug = new Meteor.Debug();

})();
