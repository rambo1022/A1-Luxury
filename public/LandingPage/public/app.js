document.getElementById("submitButton").addEventListener("click", function(event){
  event.preventDefault()
});

const sendMail = function () { 
  const pay = {}
  const creation = function(pay){
      console.log('About to make a network request!!!');
      firebase.functions().httpsCallable('sendEmail')(pay).then((res) => {
      console.log('network request is DONE!');
      console.log(res);
    });
    }
  
  if(!document.getElementById("name").value == "" && !document.getElementById("email").value == "" && !document.getElementById("subject").value == "" && !document.getElementById("message").value == "") {

      pay.name = document.getElementById('name').value
      pay.email = document.getElementById('email').value
      pay.subject = document.getElementById('subject').value
      pay.message = document.getElementById('message').value
      creation(pay)
      
  }
  
  document.getElementById('name').innerHTML = '';
  document.getElementById('email').innerHTML = '';
  document.getElementById('subject').innerHTML = '';
  document.getElementById('message').innerHTML = '';
}