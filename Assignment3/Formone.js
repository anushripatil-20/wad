$(document).ready(function(){

    $("#sub").click(function(e){
        e.preventDefault();
        const user ={
            name: $("#name").val(),
            email: $("#email").val()
        };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users));

        alert("User Registered Successfully!");
        // form.reset();
        $("form")[0].reset();
    });
});


