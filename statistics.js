var auto = [];
var tele = [];
var endgame = [];
var labels_list = [];

var ctx = document.getElementById('myChart').getContext('2d');
var form = document.getElementById("chartForm");

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  var date = form.compDate.value;
  console.log(date);

  db.collection("teams")
  .doc(form.teamName.value)
  .collection("competitions")
  .where("Date", "==", date)
  .get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      doc.ref.collection("matches")
      .get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){

          console.log(doc.data());


          labels_list.push("Match " + doc.data().matchNumber);
          console.log(labels_list);

          tele.push(calculateTele(doc.data()));
          console.log(tele);

          auto.push(calculateAuto(doc.data()));
          console.log(auto);

          endgame.push(calculateEndGame(doc.data()));
          console.log(endgame);


        });
        createChart();
      });
    });
  });




  
});

function calculateAuto(data){
  var autoTotal = 0;
  autoTotal += data.a_depot;
  autoTotal += data.a_lander;
  if (data.lander_detached)
    autoTotal += 30;
  
  if (data.scored_marker)
    autoTotal += 15;

  if (data.craterParked)
    autoTotal += 10;
  
  if (data.mineral_sampled)
    autoTotal += 25;

  return autoTotal;
}

function calculateTele(data){
  var teleTotal = 0;
  teleTotal += data.t_depot;
  teleTotal += data.t_lander;

  return teleTotal;
}

function calculateEndGame(data){
  if (data.end_game == "partial_park")
    return 15;
  else if (data.end_game == "full_park")
    return 25;
  else if (data.end_game == "hang")
    return 50;
  else
    return 0;
}

/* POINTS:
  End Game: 
    Partial Park - 15
    Full Park - 25
    Hang - 50
    Nothing - 0

  TeleOp:
    TeleLander + TeleDepot
  
  Auto:
    AutoDepot + AutoLander + Detached(True)(30) + 
    teamMarker(True)(15) + craterParked(True)(10) + 
    mineralSampled(True)(25)


*/

// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'scatter',

//     // The data for our dataset
//     data: {
//         labels: labels_list,
//         datasets: [{
//             label: "Autonomous",
//             backgroundColor: 'rgba(255, 99, 132,1)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: auto
//         },
//         {
//           label: 'TeleOp',
//           backgroundColor: 'rgba(0, 0, 0, 1)',
//           borderColor: 'rgba(0, 0, 255, 1)',
//           data: tele
//         },
//          {
//           label: 'Endgame',
//           backgroundColor: 'rgba(0, 0, 0, 1)',
//           borderColor: 'rgba(0, 255, 0, 1)',
//           data: [3, 6, 12, 14, 32, 4, 9]
//         },]
//     },

//     // Configuration options go here
//     options: {}
// });

function createChart(){


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: labels_list,
        datasets: [{
            label: 'Autonomous',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: auto
        },
        {
          label: 'TeleOp',
          backgroundColor: 'rgb(255, 255, 0)',
          borderColor: 'rgb(255, 0, 0)',
          data: tele

        },
        {
          label: 'End Game',
          backgroundColor: 'rgb(0, 255, 0)',
          borderColor: 'rgb(255, 0, 0)',
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

