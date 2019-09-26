const form = document.getElementById("teamData");


form.addEventListener('submit', (e) =>{
  e.preventDefault();
  console.log(validateForm());
  if (!validateForm()){
    console.log("Returning!");
    return;
  }

  var teamNumber = form.elements["teamNumber"].value; // validate 
  var matchNumber = form.elements["matchNumber"].value; // validate 
  var location = form.elements["location"].value;

  var detached = form.elements["detached"].checked;
  var sampled = form.elements["sampled"].checked;
  var scored = form.elements["scored"].checked;
  var parked = form.elements["parked"].checked;

  var scored_depot = form.elements["scored_depot"].value; // validate
  var scored_lander = form.elements["scored_lander"].value; // validate

  var teleop_lander = form.elements["teleop_lander"].value; // validate
  var teleop_depot = form.elements["teleop_depot"].value; // validate

  var endgame = form.elements["endgame"].value;

  var comments = document.getElementById("comments").value;

  var compDate = new Date();
  var day = String(compDate.getDate()).padStart(2, '0');
  var month = String(compDate.getMonth()+1).padStart(2, '0');
  var year = compDate.getFullYear();


  var finalDate = year + "-" + month + "-" + day;





  db.collection("teams").where("teamNumber", "==", parseInt(teamNumber))
  .get()
  .then(
    function(querySnapshot) {
      querySnapshot.forEach(
        function(doc){
          db.collection("teams")
          .doc(doc.id)
          .collection("competitions")
          .where("Date", "==", finalDate)
          .get()
          .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
              console.log(doc.data());
              doc.ref.collection("matches")
              .add({
                "teamNumber" : parseInt(teamNumber),
                "matchNumber" : parseInt(matchNumber),
                "location" : location,
                "lander_detached" : detached,
                "mineral_sampled" : sampled,
                "scored_marker" : scored,
                "craterParked" : parked,
                "a_depot" : parseInt(scored_depot),
                "a_lander" : parseInt(scored_lander),
                "t_lander" : parseInt(teleop_lander),
                "t_depot" : parseInt(teleop_depot),
                "end_game" : endgame,
                "comments" : comments
  }).then(function(resolve) {
    window.location.href = "index.html";
    
  })
  .catch(
    function(error) {
      console.error(error);
  }
  );
        });
    });
        });
    });
});



function validateForm(){
  console.log("In validate");
  console.log(form.elements["teamNumber"].value)
  if (form.elements["teamNumber"].value <= 0 || form.elements["teamNumber"].value == null){
    
    document.getElementById("errorMessage").innerHTML = "Invalid team number.";
    return false;
  }

  if (form.elements["matchNumber"].value <= 0 || form.elements["matchNumber"].value == null){
    document.getElementById("errorMessage").innerHTML = "Invalid match number.";
    return false;
  }
  if (form.elements["scored_depot"].value < 0 || form.elements["scored_depot"].value == null){
    document.getElementById("errorMessage").innerHTML = "Invalid number of points scored in depot for autonomous.";
    return false;
  }

  if (form.elements["scored_lander"].value < 0 || form.elements["scored_lander"].value == null){
    document.getElementById("errorMessage").innerHTML = "Invalid number of points scored in lander for autonomous.";
    return false;
  }

  if (form.elements["teleop_lander"].value < 0 || form.elements["teleop_lander"].value == null){
    document.getElementById("errorMessage").innerHTML = "Invalid number of points scored in lander for tele-op.";
    return false;
  }

  if (form.elements["teleop_depot"].value < 0 || form.elements["teleop_lander"].value == null){
    document.getElementById("errorMessage").innerHTML = "Invalid number of points scored in depot for tele-op.";
    return false;
  }

  // if (form.elements["compNumber"].value <= 0 || form.elements["compNumber"].value == null){
  //   document.getElementById("errorMessage").innerHTML = "Invalid competition number";
  //   return false;
  // }

  return true;
}







