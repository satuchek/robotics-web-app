function addData() {
  console.log("User pressed 'Add Data' button");
  window.location.href = "addData.html"; 
}

function statistics () {
  console.log("User pressed 'Statistics' button."); 
  window.location.href = "statistics.html";
}

function coach () {
  console.log("User pressed 'Coach' button.");
  window.location.href = "coach.html";
}

function formSubmit () {
  var form = document.getElementById("teamData");
  console.log(form.elements["teamNumber"].value)
  // window.location.href = "index.html";

if(form.elements["teamNumber"].value <= 0 || form.elements["teamNumber"] == null) {
  document.getElementById("errorMessage").innerHTML = "Invalid team number";
}

var teamNumber = form.elements["teamNumber"].value;
var matchNumber = form.elements["matchNumber"].value;
var location = form.elements["location"].value;
var detached = form.elements["detached"].checked;
var sampled = form.elements["sample"].checked;
var teamMarker = form.elements["teamMarker"].checked;
var parked = form.elements["parked"].checked;
var scoredDepot = form.elements["scoredDepot"].value;
var scoredLander = form.elements["scoredLander"].value;
var teleOpDepot = form.elements["teleOpDepot"].value;
var teleOpLander = form.elements["teleOpLander"].value;
var endGame = form.elements["endGame"].value;
var comments = document.getElementById("comments").value;

addDataToDatabase(teamNumber); 

console.table({teamNumber, matchNumber, location, detached, sampled, teamMarker, parked, scoredDepot, scoredLander, teleOpDepot, teleOpLander, endGame, comments});

}

/*
parseInt(teamNumber)
parseInt(matchNumber)
location
detached
sample
teamMarker

parsedInt(scored_depot)
parsedInt(scored_lander)
parsedInt(teleOp_lander)
parsedINt(teleOp_depot)
endGame(string)
comments(string)

*/
