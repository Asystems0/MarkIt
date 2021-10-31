var valid = false;
newUser();

function newUser(){
    const form = document.getElementById('register');
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = checkInput();

        if(valid === true){
            // const data = {
            //     email: email.value.trim(),
            //     name: name.value.trim(),
            //     password: password.value.trim()
            //     };
    
            // console.log(email.value.trim(), password.value.trim());
    
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
                console.log(json);
    
                if(res.status === 200){
                    window.location.href = "../tasks/tasks.html";
                }
    
            } catch(err) {
                console.log(err);
                res.status(400).json({message: err});
            }
        } else{
            valid = false;
        }
    });
};

function checkInput(){
    
    // const email = email.value.trim();
    // const name = name.value.trim();
    // const password = password.value.trim();
    // const password2 = password2.value.trim();

    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();
    const password2 = document.getElementById('password2').value.trim();

    if(email === ''){
        // show error
        // add error class
        setErrorFor(email, "Email cannot be blank")
    } else {
        // add success class
        setSuccessFor(email);
    }
    if(name === ''){
        // show error
        // add error class
        setErrorFor(name, "Name cannot be blank")
    } else {
        // add success class
        setSuccessFor(name);
    }
    if(password === ''){
        // show error
        // add error class
        setErrorFor(password, "Password cannot be blank")
    } else {
        // add success class
        setSuccessFor(password);
    }
    if(password2 === ''){
        // show error
        // add error class
        setErrorFor(password2, "Password cannot be blank")
    } else {
        // add success class
        setSuccessFor(password2);
    }
    if(valid === true){
        const data = {name: name, email: email, password: password};
        return data;
    }
};

function setErrorFor(input, message){
    console.log(message);
    valid = false;
};

function setSuccessFor(input){
    console.log(input);
    valid = true;
};