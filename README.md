remote-debug
============

This smart package is a console.log alternative that sends the same messages directly to your favorite developers tool in your browser. 

To use this, instead of console.log just do Meteor.Debug.log

    //console.log("Hello from the server", 1);
    Meteor.Debug.log("Hello from server", 1);
    Meteor.Debug.warn("Server Warning", {error : "Outch!!"});
    Meteor.Debug.info("Did you know that ....");

Updated to support the new 0.6.5 api