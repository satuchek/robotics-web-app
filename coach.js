const form = document.getElementById('coachForm');


form.addEventListener('submit', (e) => {
e.preventDefault();



db.collection("teams")
  .get()
  .then(
    function(querySnapshot){
      querySnapshot.forEach(
        function(doc){
          db.collection("teams")
          .doc(doc.id)
          .collection("competitions")
          .where("Date", "==", form.compDate.value)
          .get()
          .then(function(querySnapshot){
            if (querySnapshot.docs.length == 0){
              db.collection("teams").doc(doc.id).collection("competitions").add({
                Date: form.compDate.value,
                Location: form.loc.value,
                });
              console.log("doesn't exist");
              return("doesn't");

            }else{
              console.log(querySnapshot);
              return("exists");
            }
          })
          .then(function(resolve) {
            
            console.log("Resolve: " + resolve);
          })
          .catch(
            function(error){

              console.log("Error: " + error);
            })
        })
    }
  );
});
        
        
        
        
        
        
