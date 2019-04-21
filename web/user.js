function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function login_prompt(){
	var inner ="";
	var user = getCookie("username");
	if ( user == ""){
		inner = "<form>"
			+"<h3>User Account</h3>"
			+"Username<br>"
			+"<input type=\"text\" id=\"username_entry\" name=\"username\" maxlength=20>"
			+"<br>Password<br>"
			+"<input type=\"text\" id=\"password_entry\" name=\"password\" maxlength=20><br>"
			+"<input type=\"button\" onclick=\"login()\" value=\"Log in\">"
			+"<input type=\"button\" onclick=\"create_user()\" value=\"Create Account\">"
		+"</form><br>";
	} else {
		inner = "<p>Hello, " + user + "<p/>";
	}
	document.getElementById("login").innerHTML = inner;
}

function create_user(){
	var usern = document.getElementById("username_entry");
	var passwd = document.getElementById("password_entry");
	// need to make a request to the server, it will return an error
	// if it is a duplicate

	var request = new XMLHttpRequest();
	request.open('POST','/users/', true);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onload = function(){
		r = JSON.parse(request.responseText);
	}
}

function login(){
	var usern = document.getElementById("username_entry").value;
	var passwd = document.getElementById("password_entry").value;
	var request = new XMLHttpRequest();
	request.open('GET','/users/', true);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.setRequestHeader('username', usern);
	request.setRequestHeader('password', passwd);
	request.onload = function(){
		r = JSON.parse(request.responseText);
		if (r.response){
			// create a cookie
			console.log(reponse)
		} else {
			document.getElementById("username_entry").style.backgroundColor = "red";
			document.getElementById("password_entry").style.backgroundColor = "red";
		}
	}
	request.send();
}
