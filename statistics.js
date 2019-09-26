var auto = [];
var tele = [];
var endgame = [];
var labels_list = [];


var ctx = document.getElementById('myChart').getContext('2d');
var form = document.getElementById("chartForm");
form.addEventListener('submit', (e) => {
  e.preventDefault();

var date = form.compDate.value;

 db.collection('teams').doc(form.teamName.value).collection("competitions")
 .where("Date", "==", date)
 .get()
 .then(function (querySnapshot){
  querySnapshot.forEach(function(doc){
    doc.ref.collection("matches")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
       console.log(doc.data());

       tele.push(calculateTeleOp(doc.data()));
       console.log("TeleOP total", tele);

      auto.push(calculateAuto(doc.data()));
       console.log("Auto total", tele);

      endgame.push(calculateEndGame(doc.data()));
       console.log("endgame total", endgame);

      labels_list.push("Match: " + doc.data().matchNumber);
       console.log("Labels: ", labels_list);

      

      });

      drawChart(); 

    });


  });

});

});

function calculateAuto(data) {
var autoTotal = 0;
autoTotal += data.autoDepot;
autoTotal += data.autoLander;

if(data.landerDetached) {
  autoTotal += 30;
}
if (data.mineralSampled) {
  autoTotal += 25;
}
if(data.teamMScored) {
autoTotal +=30;
}
if (data.craterParked) {
  autoTotal +=10;
}
return autoTotal;

}

function calculateTeleOp (data) {
var teleOpTotal = 0;
teleOpTotal = data.TeleDepot + data.TeleLander; 

return teleOpTotal;
}

function calculateEndGame (data) {

  if(data.endgame == "partial park") {
    return 15;
  }
  else if (data.endgame == "full park") {
    return 25;
  }
  else if (data.endgame == "hang") {
    return 50;
  }
  else {
    console.log(data.endgame)
    return 0;
    
  }
  
  
}


//   db.collection("teams").doc(form.teamName.value).collection("competitions")
// .where("Date" ,"==",date)
// .get()
// .then (
//   function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       console.log("IN loop");
//       console.log(doc.data);
//     });

//   });
// }); 





// db.collection("teams").where("teamNumber", "==", 1)
// .get()
// .then (
//   function (querySnapshot) {
//     querySnapshot.forEach(
//       function(doc) {
//          console.log(doc.id);
//       }
//     )
//   }
// )
function drawChart () {
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: labels_list,
        datasets: [{
            label: "Autonomous",
            backgroundColor: 'rgb(102, 255, 102)',
            borderColor: 'rgb(128, 128, 128)',
            data: auto
        },
        {
          label: 'TeleOp',
          backgroundColor: 'rgb(102, 0, 255)',
          borderColor: 'rgb(128, 128, 128)',
          data: tele
        },
        {
          label: 'End Game',
            backgroundColor: 'rgb(204, 153, 255)',
            borderColor: 'rgb(128, 128, 128)',
            data: endgame
        }
        ]
    },

    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});
}