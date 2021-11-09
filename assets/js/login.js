
$(document).ready(function(){
    $('.submit-btn').bind('click', async function(event){
        event.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        $('#email').css({'background': 'transparent', 'border-radius': 0});
        $('#emailError').hide();
        $('#password').css({'background': 'transparent', 'border-radius': 0});
        $('#passwordError').hide();

        if (email === '' && password === ''){
            $('#emailError').text('Blank email field').show();
            $('#email').css({'background': 'rgba(255, 0, 0, 0.2)', 'border-radius': '5px'});
            $('#passwordError').text('Blank password field').show();
            $('#password').css({'background': 'rgba(255, 0, 0, 0.2)', 'border-radius': '5px'});
            return;
        }

        if (email === ''){
            $('#emailError').text('Blank email field').show();
            $('#email').css({'background': 'rgba(255, 0, 0, 0.2)', 'border-radius': '5px'});
            return;
        }

        if (password === ''){
            $('#passwordError').text('Blank password field').show();
            $('#password').css({'background': 'rgba(255, 0, 0, 0.2)', 'border-radius': '5px'});
            return;
        }
        const data = {
            email: email,
            password: password,
        };
                    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data)
        };
            
        try {
            const res = await fetch('/user/login', options);
            const json = await res.json();
            console.log(json);
            console.log(json.token);
            if(res.status === 200){
                console.log("OK");
                window.location.href = '/views/tasks.html';
            }
            if(res.status === 400){
                // console.log(res);
            }
            else{
                // console.log("HO");
            }
        }catch (err) {
            
          }
        // } catch(err){

        //     console.log(err.response);
        //     return err.response;
        //     // console.log(err.response.status);
        //     // console.log(err.response.headers);
        //     // console.log(res);
        //     // res.status(400).json({message: "Faild"});
        // }
    });
});



// function connection(){
    
//     const login = document.getElementById('login');
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');

//     login.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const data = {

//             email: email.value.trim(),
//             password: password.value.trim(),
//             };
        
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },

//             body: JSON.stringify(data)
//         };

//         try {
//             const res = await fetch('/user/login', options);
//             const json = await res.json();
//             console.log(json);
//             console.log(json.token);
//             if(res.status === 200)
//             {
//                 console.log("OK");
//                 window.location.href = '/views/tasks.html';
//             }
//             else{
//                 console.log("HO");
//             }
//         } catch (err) {
//             console.log(err);
//             res.status(400).json({message: "Faild"});
//         }
//     });
// };

// connection();