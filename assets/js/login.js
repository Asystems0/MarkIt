$(document).ready(() => {
    $('.submit-btn').bind('click', async (event) => {
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
            }else {
                if(json.msg.includes('mail')){
                    $('#emailError').text(json.msg.replace(/['"]+/g, '')).show();
                    $('#email').css({'background': 'rgba(255, 0, 0, 0.2)', 'border-radius': '5px'});
                }
                if(json.msg.includes('password')){
                    $('#passwordError').text(json.msg.replace(/['"]+/g, '')).show();
                    $('#password').css({'background': 'rgba(255, 0, 0, 0.2)', 'border-radius': '5px'});
                }
            }
        }catch(error) {
            console.log('API Error: ', error);
        }
    });
});