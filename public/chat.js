console.log("connected chat");
window.onload = function() {
    checkcookie();
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var registerButton = document.getElementById("registerbutton");
    var users = [];
    var numberofusers = document.getElementById("numberofusers");

function showRegister(){
        document.getElementById("register").classList.remove("hidden");
        document.getElementById("chat").classList.add("hidden");
        document.getElementById("logout").classList.add("hidden");
}

function showChat(){

        document.getElementById("chat").classList.remove("hidden");
        document.getElementById("logout").classList.remove("hidden");
        document.getElementById("register").classList.add("hidden");
}

function checkcookie(){
    if (document.cookie){
        showChat();
    }
};

// GET COOKIE INFO
    function getCookie() {
    var name = "username=";
    var ca = document.cookie.split('=');
    return ca[1];
}
var usernameStored = getCookie();



// REGISTER NEW USER
    registerButton.onclick = function() {
         if((username.value || email.value) == "") {
            alert("Please type your name and email!");
         } else {
            document.cookie = "username="+ username.value + ";";
            showChat();
            //Send info about users to server:
            //var uname = username.value;
            //var uemail = email.value;
            //  var existsinroom = users.indexOf(uname); 
            //  if (existsinroom > -1){
            //     alert("Please choose another name, this one is already on use");
            //  } else {
            //     users.push(uname);
            //     socket.emit("register", {username : uname, email: uemail});
            // }    
        }
    }


// NUMBER OF USERS
    socket.on("numberofusers",function(data){
        numberofusers.innerHTML = "# of users in room: " + data;
    })



// SEND MESSAGE
    sendButton.onclick = function() {
            var text = field.value;
            socket.emit('send', { message: text, username: (username.value || usernameStored) });
            field.value = "";
        }


//logout
    logout.onclick = function(){
        document.cookie = "";
            showRegister();
    }




// RECEIVING MESSAGES
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
                //html += "<p style='font-size:15px;' id='logout'>Not " +usernameStored + "? <a href=#>Sign in as a different user</a></p>"
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    })
    
}

