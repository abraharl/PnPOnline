$(document).ready(function(){
	$('#newUserForm #submitNew').click(function(){
		var name = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();
		var confirmPassword = $('input[name="confirmPassword"]').val();
		var email = $('input[name="email"]').val();
		var confirmEmail = $('input[name="confirmEmail"]').val();

		//reset the input borders
		$('input[name="username"]').css("border","solid 1px #AAAAAA");
		$('input[name="password"]').css("border","solid 1px #AAAAAA");
		$('input[name="confirmPassword"]').css("border","solid 1px #AAAAAA");
		$('input[name="email"]').css("border","solid 1px #AAAAAA");
		$('input[name="confirmEmail"]').css("border","solid 1px #AAAAAA");

		validateUser(name,password,confirmPassword,email,confirmEmail);
	});
});

function validateUser(username,password,confirmPassword,email,confirmEmail){
	var errors=[];

	if(username == ""){
	  errors[errors.length] = "Please enter a username.";
	  $('input[name="username"]').css("border","solid 1px #E60000");
	}

	if(password == ""){
		errors[errors.length] = "Please enter a password.";
		$('input[name="password"]').css("border","solid 1px #E60000");
	}

	if(email == ""){
		errors[errors.length] = "Please enter a valid email address.";
		$('input[name="email"]').css("border","solid 1px #E60000");
	}

	if(password != confirmPassword){
		errors[errors.length] = "Your passwords do not match.";
		$('input[name="confirmPassword"]').css("border","solid 1px #E60000");
	}

	if(email != confirmEmail){
		errors[errors.length] = "Your email addresses do not match."
		$('input[name="confirmEmail"]').css("border","solid 1px #E60000");
	}

	if(errors.length > 0){
		$('.error').html('');
		$('.error').show();
		for(var i = 0;i<errors.length;i++){
			if(i != errors.length-1){
				$('.error').append(errors[i]+"<br>");
			}
			else{
				$('.error').append(errors[i]);
			}
		}
		return;
	}
	else{
		$.ajax({
			url:"/createUser?username="+escape(username)+'&password='+escape(password)+'&email='+escape(email),
			async:"true",
			type:"POST",
			success:function(data){
				window.location = "/index.html";
				return;
			},
			error:function(data){
				$('.error').show();
				$('.error').html(data.responseText);
				return;
			}
		});
	}
}