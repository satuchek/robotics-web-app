const form = document.getElementById('coach');


form.addEventListener('submit', (e) => {
e.preventDefault();
console.log(form.compDate.value);


// db.collection("teams")
// .get()
// .then
//   (function(querySnapshot) {
//     querySnapshot.forEach (
//       function (doc) {
//          db.collection("teams")
//         .doc(doc.id)
//         .collection("competitions")
//           .add({Date: form.compDate.value, Location: form.})
//           .then(
//             function(docRef) {
//               console.log("Document Written with ID: ", docRef.id);
//             });
        
//       });
        
        
        
//         });

db.collection("teams")
.get()
.then(
  function(querySnapshot){
    querySnapshot.forEach(
      function (doc) {
        db.collection("teams")
        .doc(doc.id)
        .collection("competitions")
        .get()
        .then(
          function(querySnapshot){
            querySnapshot.forEach(
              function(doc){
                if (doc.Date == form.compDate.value){
                  resolve("exists");
                }
              }).
          }
        )
      }
    )
  }
)
});
        
        
        
        
        
        
