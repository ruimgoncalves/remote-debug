remote-debug
============

Tired of switching windows to read those console debug messages? I was!!

This smart package is a console.log alternative that sends the same messages directly to your favorite developers tool in your browser. 

To use this, instead of console.log just do Meteor.Debug.log

    //console.log("Hello from the server", 1);
    Meteor.Debug.log("Hello from the server", 1);
