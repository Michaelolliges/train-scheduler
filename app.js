var config = {
    apiKey: "AIzaSyAUK5EpS-G9-voI27KHt_MIgHALGMokEHM",
    authDomain: "coding-bootcamp19.firebaseapp.com",
    databaseURL: "https://coding-bootcamp19.firebaseio.com",
    projectId: "coding-bootcamp19",
    storageBucket: "coding-bootcamp19.appspot.com",
    messagingSenderId: "50505274859"
  };
  firebase.initializeApp(config);
  //firebase data above...

  var database=firebase.database();
//.onclick fucktion..
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    //variables for trains...
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm" ).format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };
    database.ref().push(newTrain);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
    //figured this should work from past in class activities.
  });
      database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
      var trainFrequency = trainFrequency;
      var firstTime = trainTime
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % tFrequency;
      var tMinutesTillTrain = tFrequency - tRemainder;
//still not seeing anything on firebase, think ive done the set up corretly with my key and rest of the data...
      console.log(tMinutesTillTrain)
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  
     //set train info...
      
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });