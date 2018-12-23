  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCD8y-N4RvVp6DkyAjW2LgAnLeAwLcL4vA",
    authDomain: "train-scheduler-630dc.firebaseapp.com",
    databaseURL: "https://train-scheduler-630dc.firebaseio.com",
    projectId: "train-scheduler-630dc",
    storageBucket: "train-scheduler-630dc.appspot.com",
    messagingSenderId: "869907591602"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

var name = "";
var dest = "";
var ftrain = "";
var freq  = "";

$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    ftrain = $("#ftrain-input").val().trim();
    freq = $("#freq-input").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      dest: dest,
      ftrain: ftrain,
      freq: freq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});


database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().ftrain);
    console.log(childSnapshot.val().freq);


    var name = childSnapshot.val().name
    var dest = childSnapshot.val().dest
    var ftrain = childSnapshot.val().ftrain
    var freq = childSnapshot.val().freq

    var ftt = moment(ftrain, "HH:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(ftt), "minutes");
    var tRemainder = timeDiff % freq;

    var tMin = freq - tRemainder;
    var nextArrivaMin = moment().add(tMin, "minutes");
    tArr = moment(nextArrivaMin).format("hh:mm A")

    $("tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td class='min'>" + freq + "</td><td class='min'>" + tArr + "</td><td class='min'>" + tMin + "</td></tr>");

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });





