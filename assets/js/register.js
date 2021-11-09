var validation = true;

$(document).ready(function(){
    $('.submit-btn').bind('click', async (event) => {
        event.preventDefault();


        const name = $('#name');
        const email = $('#email');
        const password = $('#password');
        const password2 = $('#password2');

        $('#nameError').hide();
        $('#emailError').hide();
        $('#passwordError').hide();
        $('#password2Error').hide();

        // checkInput(name, '#nameError', 'Name cannot be blank');
        // checkInput(email, '#emailError', 'Email cannot be blank');
        // checkInput(password, '#passwordError', 'Password cannot be blank');
        // checkInput(password2, '#password2Error', 'Password cannot be blank');
        
        const data = {
            name: name.val().trim(),
            email: email.val().trim(),
            password: password.val().trim(),
            password2: password2.val().trim(),
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        try {
            const res = await fetch('/user/register', options);
            const json = await res.json();
            // console.log(json);

            if(res.status === 200){
                window.location.href = '/views/tasks.html';
            }else{
                // json.msg = json.msg.replace(/['"]+/g, '');
                console.log(json.msg);
                if(json.msg.startsWith('Name')){
                    erroerMsg('#nameError', json.msg);
                    return;
                }else successMsg(name);

                if(json.msg.startsWith('Email')){
                    erroerMsg('#emailError', json.msg);
                    return;
                }else successMsg(email);

                if(json.msg.startsWith('Password')){
                    erroerMsg('#passwordError', json.msg);
                    return;
                }else successMsg(password);

                if(json.msg.startsWith('Confirm')){
                    erroerMsg('#password2Error', json.msg);
                    return;
                }else successMsg(password2);

                if(validation === false) return
            }

        } catch(err) {
            console.log(err);
            res.status(400).json({message: err});
        }

    });
});

function erroerMsg(errorId, errorMsg){
        $(errorId).text(errorMsg).show();
        $(errorId).css({'background': 'rgba(255, 0, 0, 0.2)', 'border-radius': '5px'});
        validation = false;
};

function successMsg(userInput){
        $(userInput).css({'border-color': '#2ecc71'}); //Use in variable name
};


// var valid = false;
// newUser();

// function newUser(){
//     // window.location.href = "../../views/tasks.html";
//     const form = document.getElementById('register');
//     const email = document.getElementById('email');
//     const name = document.getElementById('name');
//     const password = document.getElementById('password');
//     const password2 = document.getElementById('password2');
    

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const data = checkInput();

//         if(valid === true){
//             // const data = {
//             //     email: email.value.trim(),
//             //     name: name.value.trim(),
//             //     password: password.value.trim()
//             //     };
    
//             // console.log(email.value.trim(), password.value.trim());
    
//             const options = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
    
//                 body: JSON.stringify(data)
//             };
    
//             try {
//                 const res = await fetch('/user/register', options);
//                 const json = await res.json();
//                 console.log(json);
    
//                 if(res.status === 200){
//                     window.location.href = '/views/tasks.html';
//                 }
    
//             } catch(err) {
//                 console.log(err);
//                 res.status(400).json({message: err});
//             }
//         } else{
//             valid = false;
//         }
//     });
// };

// function checkInput(){
    
//     // const email = email.value.trim();
//     // const name = name.value.trim();
//     // const password = password.value.trim();
//     // const password2 = password2.value.trim();

//     const email = document.getElementById('email').value.trim();
//     const name = document.getElementById('name').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const password2 = document.getElementById('password2').value.trim();

//     if(email === ''){
//         // show error
//         // add error class
//         setErrorFor(email, "Email cannot be blank")
//     } else {
//         // add success class
//         setSuccessFor(email);
//     }
//     if(name === ''){
//         // show error
//         // add error class
//         setErrorFor(name, "Name cannot be blank")
//     } else {
//         // add success class
//         setSuccessFor(name);
//     }
//     if(password === ''){
//         // show error
//         // add error class
//         setErrorFor(password, "Password cannot be blank")
//     } else {
//         // add success class
//         setSuccessFor(password);
//     }
//     if(password2 === ''){
//         // show error
//         // add error class
//         setErrorFor(password2, "Password cannot be blank")
//     } else {
//         // add success class
//         setSuccessFor(password2);
//     }
//     if(valid === true){
//         const data = {name: name, email: email, password: password};
//         return data;
//     }
// };

// function setErrorFor(input, message){
//     // console.log(message);
//     valid = false;
// };

// function setSuccessFor(input){
//     // console.log(input);
//     valid = true;
// };