const form = document.getElementById("teamData");

var competitionDate = new Date();
var day = String(competitionDate.getDate()).padStart(2, '0');
var month = String(competitionDate.getMonth()+1).padStart(2,'0');
var year = competitionDate.getFullYear();

var finalDate = year + '-' + month + '-'+ day;
console.log("Formatted Date: " + finalDate);

form.addEventListener('submit', (e) => {
e.preventDefault();
if(!validateForm()) {
  return;
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

var competitionDate = new Date();
var day = String(competitionDate.getDate()).padStart(2, '0');
var month = String(competitionDate.getMonth()+1).padStart(2,'0');
var year = competitionDate.getFullYear();

var finalDate = year + '-' + month + '-'+ day;
console.log("Formatted Date: " + finalDate);


db.collection("teams").where("teamNumber", "==", parseInt(teamNumber))
.get()
.then
  (function(querySnapshot) {
    querySnapshot.forEach (
      function (doc) {
        db.collection("teams")
        .doc(doc.id)
        .collection("competitions")
        .where("Date", "==", finalDate)
        .get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            doc.ref.collection("matches")
            .add({
          "teamNumber": parseInt(teamNumber),
          "matchNumber": parseInt(matchNumber),
          "location": location,
          "landerDetached": detached,
          "mineralSampled": sampled,
          "teamMScored": teamMarker,
          "craterParked": parked,
          "autoDepot": parseInt(scoredDepot),
          "autoLander": parseInt(scoredLander),
          "teleDepot": parseInt(teleOpDepot),
          "TeleLander": parseInt(teleOpLander),
          "endgame": endGame,
          "comments": comments

      
}).then(function (resolve) {
  window.location.href = "index.html";
})
.catch
  (function (error) {
    console.error(error);
  }
);


        });
          });
        });
      });









});









function validateForm () {

if(form.elements["teamNumber"].value < 0 || form.elements["teamNumber"] == null) {
  document.getElementById("errorMessage").innerHTML = "Invalid team number";
  return false;
}


if(form.elements["matchNumber"].value <= 0 || form.elements["matchNumber"] == null) {
  document.getElementById("errorMessage").innerHTML = "Invalid match number";
  return false;
}


if(form.elements["scoredDepot"].value < 0 || form.elements["scoredDepot"] == null) {
  document.getElementById("errorMessage").innerHTML = "Invalid auto number for scored in depot ";
  return false;
}

if(form.elements["scoredLander"].value < 0 || form.elements["scoredLander"] == null) {
  document.getElementById("errorMessage").innerHTML = "Invalid auto number for scored in lander ";
  return false;
}

if(form.elements["teleOpDepot"].value < 0 || form.elements["teleOpDepot"] == null) {
  document.getElementById("errorMessage").innerHTML = "Invalid teleOp number for scored in depot";
  return false;
}

if(form.elements["teleOpLander"].value < 0 || form.elements["teleOpLander"] == null) {
  document.getElementById("errorMessage").innerHTML = "Invalid teleOp number for scored in Depot";
  return false;

}

// if(form.elements["compNum"].value <= 0 || form.elements["compNum"] == null) {
//   document.getElementById("errorMessage").innerHTML = "Invalid competition number";
//   return false;

// }

return true; 

}

