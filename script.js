var teamNumber;

function addData(){
  console.log("User pressed 'Add Data' button");
  window.location.href = "addData.html";

}

function statistics(){
  console.log("User pressed 'Statistics' button.");
  window.location.href = "statistics.html";
}

function coach(){
  window.location.href = "coach.html";

}

function formSubmit(){
  var form = document.getElementById("teamData");
  
  console.log(form.elements["teamNumber"].value);
  if (form.elements["teamNumber"].value <= 0 || form.elements["teamNumber"].value == null){
    document.getElementById("errorMessage").innerHTML = "Invalid team number.";
  }
  var teamNumber = form.elements["teamNumber"].value;
  var matchNumber = form.elements["matchNumber"].value;
  var location = form.elements["location"].value;

  var detached = form.elements["detached"].checked;
  var sampled = form.elements["sampled"].checked;
  var scored = form.elements["scored"].checked;
  var parked = form.elements["parked"].checked;

  var scored_depot = form.elements["scored_depot"].value;
  var scored_lander = form.elements["scored_lander"].value;

  var teleop_lander = form.elements["teleop_lander"].value;
  var teleop_depot = form.elements["teleop_depot"].value;

  var endgame = form.elements["endgame"].value;

  var comments = document.getElementById("comments").value;

  var number = 6;
  console.table({teamNumber, matchNumber, location, detached, sampled, scored, parked, scored_depot, scored_lander, teleop_lander, teleop_depot, endgame, comments, number});
  // window.location.href = "index.html";
  addDataToDatabase(teamNumber);
}
/*
Values to send to the database:
parseInt(teamNumber)
parseInt(matchNumber)
location (string)
detached (boolean)
sampled (boolan)
scored (boolean)
parked (boolean)

parseInt(scored_depot)
parseInt(scored_lander)
parseInt(teleop_lander)
parseInt(teleop_depot)

endgame (string)
comments (string)

*/



// db.collection("cities").where("capital", "==", true)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
